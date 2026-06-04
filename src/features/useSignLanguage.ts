import { useState, useEffect, useRef, useCallback } from "react";
import { loadMediaPipe } from "@/utils/loadMediaPipe";
import signLanguageApi from "@/services/signLanguageApi";
import signLanguageHub from "@/services/signLanguageHub";

export interface Landmark {
  x: number;
  y: number;
  z: number;
}

export interface UseSignLanguageProps {
  userToken?: string;
  onTranslationSuccess?: (word: string) => void;
}

export const useSignLanguage = ({
  userToken,
  onTranslationSuccess,
}: UseSignLanguageProps = {}) => {
  // Session States
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Predictions States
  const [predictedChar, setPredictedChar] = useState<string | null>(null);
  const [accumulatedWord, setAccumulatedWord] = useState<string>("");
  const [detectedLandmarks, setDetectedLandmarks] = useState<Landmark[]>([]);

  // Refs for tracking camera loop & throttling
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cameraInstanceRef = useRef<any>(null);
  const handsInstanceRef = useRef<any>(null);
  const isProcessingRef = useRef(false);
  const lastRequestTimeRef = useRef<number>(0);
  const activeSessionIdRef = useRef<string | null>(null);

  // Letter stability tracker to auto-append characters
  const stabilityRef = useRef<{ char: string; count: number }>({ char: "", count: 0 });

  // Reset accumulation
  const resetSession = useCallback(() => {
    setAccumulatedWord("");
    setPredictedChar(null);
    setDetectedLandmarks([]);
    stabilityRef.current = { char: "", count: 0 };
  }, []);

  // Cleanup MediaPipe and camera
  const cleanupMediaPipe = useCallback(async () => {
    try {
      if (cameraInstanceRef.current) {
        await cameraInstanceRef.current.stop();
        cameraInstanceRef.current = null;
      }
      if (handsInstanceRef.current) {
        await handsInstanceRef.current.close();
        handsInstanceRef.current = null;
      }
    } catch (err) {
      console.warn("Cleanup warning:", err);
    }
    setDetectedLandmarks([]);
  }, []);

  // Manual Letter editing operations
  const addLetter = useCallback((char: string) => {
    setAccumulatedWord((prev) => prev + char);
  }, []);

  const deleteLastLetter = useCallback(() => {
    setAccumulatedWord((prev) => prev.slice(0, -1));
  }, []);

  const addSpace = useCallback(() => {
    setAccumulatedWord((prev) => prev + " ");
  }, []);

  // Main start handler
  const startSession = async (videoElement: HTMLVideoElement) => {
    if (isRecording) return;
    videoRef.current = videoElement;
    setIsLoading(true);
    setError(null);
    setPredictedChar(null);
    setDetectedLandmarks([]);

    try {
      // 1. Load MediaPipe CDN Scripts
      setLoadingMessage("جاري تحميل نظام الذكاء الاصطناعي...");
      await loadMediaPipe();

      // 2. Create Session on Backend
      setLoadingMessage("جاري إنشاء جلسة الترجمة...");
      const sessionData = await signLanguageApi.createSession(userToken);
      const sid = sessionData.sessionId;
      setSessionId(sid);
      activeSessionIdRef.current = sid;

      // 3. Connect to SignalR Hub
      setLoadingMessage("جاري الاتصال بالخادم في الوقت الفعلي...");
      await signLanguageHub.startConnection(userToken);

      // 4. Initialize MediaPipe Hands
      setLoadingMessage("جاري تشغيل الكاميرا ورسم المخطط...");
      const HandsClass = (window as any).Hands;
      const hands = new HandsClass({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.6,
      });

      hands.onResults((results: any) => {
        if (!activeSessionIdRef.current) return;

        // If a hand landmark is present in the frame
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
          const landmarks: Landmark[] = results.multiHandLandmarks[0];
          setDetectedLandmarks(landmarks);

          // Flatten the landmarks for the recognition endpoint (21 landmarks x 3 axes = 63 floats)
          const now = Date.now();
          const throttleInterval = 350; // Throttling interval to save bandwidth and keep API performant
          
          if (!isProcessingRef.current && now - lastRequestTimeRef.current > throttleInterval) {
            isProcessingRef.current = true;
            lastRequestTimeRef.current = now;

            const flatLandmarks = landmarks.flatMap((lm) => [lm.x, lm.y, lm.z]);

            signLanguageApi
              .recognizeLandmarks(activeSessionIdRef.current, flatLandmarks)
              .then((res) => {
                // Read predicted character from response (e.g. prediction or predicted_char)
                const char = res.prediction || res.predicted_char || "";
                if (char && char.trim()) {
                  const cleanedChar = char.trim();
                  setPredictedChar(cleanedChar);

                  // Trigger SignalR prediction real-time broadcast
                  if (activeSessionIdRef.current) {
                    signLanguageHub.sendPrediction(activeSessionIdRef.current, cleanedChar);
                  }

                  // Handle letter stability for smart auto-append
                  if (stabilityRef.current.char === cleanedChar) {
                    stabilityRef.current.count += 1;
                    // If recognized stably across 3 predictions (approx 1 second of holding gesture)
                    if (stabilityRef.current.count === 3) {
                      setAccumulatedWord((prev) => prev + cleanedChar);
                    }
                  } else {
                    stabilityRef.current = { char: cleanedChar, count: 1 };
                  }
                }
              })
              .catch((err) => {
                console.error("Fingerspelling recognition error:", err);
              })
              .finally(() => {
                isProcessingRef.current = false;
              });
          }
        } else {
          // No hand in frame, clear landmarks and stability counters
          setDetectedLandmarks([]);
          stabilityRef.current = { char: "", count: 0 };
        }
      });

      handsInstanceRef.current = hands;

      // 5. Initialize MediaPipe Camera utility
      const CameraClass = (window as any).Camera;
      const camera = new CameraClass(videoElement, {
        onFrame: async () => {
          if (handsInstanceRef.current) {
            await handsInstanceRef.current.send({ image: videoElement });
          }
        },
        width: 640,
        height: 480,
      });

      cameraInstanceRef.current = camera;
      await camera.start();

      setIsRecording(true);
    } catch (err: any) {
      console.error("Failed to start sign language session:", err);
      setError(err?.message || "فشل بدء الاتصال بالكاميرا أو الخادم.");
      cleanupMediaPipe();
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  // Main stop handler
  const stopSession = async () => {
    if (!sessionId) return;
    setIsLoading(true);
    setLoadingMessage("جاري إنهاء الجلسة واستخراج الترجمة النهائية...");

    try {
      // 1. Call End Session API on backend
      await signLanguageApi.endSession(sessionId, userToken);
      
      // 2. Shut down connection to SignalR hub
      await signLanguageHub.stopConnection();

      // 3. Stop MediaPipe Hand instances & Camera feed
      await cleanupMediaPipe();

      // 4. Fire final success callback if word is available
      if (accumulatedWord.trim() && onTranslationSuccess) {
        onTranslationSuccess(accumulatedWord);
      }

      setIsRecording(false);
      setSessionId(null);
      activeSessionIdRef.current = null;
    } catch (err: any) {
      console.error("Error stopping session:", err);
      setError("حدث خطأ أثناء إنهاء الجلسة.");
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  // Cleanup connections on unmount
  useEffect(() => {
    return () => {
      cleanupMediaPipe();
      signLanguageHub.stopConnection();
      activeSessionIdRef.current = null;
    };
  }, [cleanupMediaPipe]);

  return {
    sessionId,
    isRecording,
    isLoading,
    loadingMessage,
    error,
    predictedChar,
    accumulatedWord,
    detectedLandmarks,
    startSession,
    stopSession,
    resetSession,
    addLetter,
    deleteLastLetter,
    addSpace,
    setAccumulatedWord,
  };
};

export default useSignLanguage;

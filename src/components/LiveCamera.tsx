import { useRef, useState, useEffect, useContext } from "react";
import { Camera, X, Loader2, RefreshCw, Space, Delete, Sparkles, CheckCircle2 } from "lucide-react";
import { UserContext } from "@/context/UserContext";
import { useSignLanguage } from "@/features/useSignLanguage";

interface LiveCameraProps {
  onTranslationSuccess?: (word: string) => void;
}

export const LiveCamera = ({ onTranslationSuccess }: LiveCameraProps) => {
  const { userToken } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Integrate the custom feature hook
  const {
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
    deleteLastLetter,
    addSpace,
  } = useSignLanguage({
    userToken,
    onTranslationSuccess: (finalWord) => {
      if (onTranslationSuccess) {
        onTranslationSuccess(finalWord);
      }
      setOpen(false);
    },
  });

  // Launch camera session when modal is opened
  const handleOpenModal = () => {
    setOpen(true);
    resetSession();
  };

  // Terminate camera session and close modal
  const handleCloseModal = async () => {
    if (isRecording) {
      await stopSession();
    }
    setOpen(false);
  };

  // Canvas drawing loop for glowing hand skeleton overlay
  useEffect(() => {
    if (!isRecording || !canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let active = true;

    const drawLoop = () => {
      if (!active || !canvas || !videoRef.current) return;

      // Make canvas size dynamic based on actual layout dimensions
      const videoWidth = videoRef.current.clientWidth;
      const videoHeight = videoRef.current.clientHeight;
      if (canvas.width !== videoWidth || canvas.height !== videoHeight) {
        canvas.width = videoWidth;
        canvas.height = videoHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (detectedLandmarks && detectedLandmarks.length > 0) {
        const width = canvas.width;
        const height = canvas.height;

        // Hand skeletal connections mapping (21 landmarks)
        const connections = [
          // Thumb finger
          [0, 1], [1, 2], [2, 3], [3, 4],
          // Index finger
          [0, 5], [5, 6], [6, 7], [7, 8],
          // Middle finger
          [9, 10], [10, 11], [11, 12],
          // Ring finger
          [13, 14], [14, 15], [15, 16],
          // Pinky finger
          [0, 17], [17, 18], [18, 19], [19, 20],
          // Palm base/joint knuckles connections
          [5, 9], [9, 13], [13, 17]
        ];

        // 1. Draw glowing skeleton connection lines (Emerald Theme)
        ctx.strokeStyle = "rgba(0, 182, 92, 0.85)"; // Glowing Emerald Green
        ctx.lineWidth = 3.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowColor = "rgba(0, 182, 92, 0.6)";
        ctx.shadowBlur = 12;

        for (const [startIdx, endIdx] of connections) {
          const startPt = detectedLandmarks[startIdx];
          const endPt = detectedLandmarks[endIdx];

          if (startPt && endPt) {
            ctx.beginPath();
            ctx.moveTo(startPt.x * width, startPt.y * height);
            ctx.lineTo(endPt.x * width, endPt.y * height);
            ctx.stroke();
          }
        }

        // 2. Draw glowing knuckle joint nodes (Vibrant Orange Theme)
        ctx.fillStyle = "rgba(251, 146, 60, 0.95)"; // Neon Peach/Orange
        ctx.shadowColor = "rgba(251, 146, 60, 0.85)";
        ctx.shadowBlur = 8;

        for (const pt of detectedLandmarks) {
          ctx.beginPath();
          ctx.arc(pt.x * width, pt.y * height, 5.5, 0, 2 * Math.PI);
          ctx.fill();
        }
      }

      requestAnimationFrame(drawLoop);
    };

    drawLoop();

    return () => {
      active = false;
    };
  }, [detectedLandmarks, isRecording]);

  return (
    <div className="flex justify-center items-center">
      {/* 🎯 Camera Icon Trigger Button */}
      {!open && (
        <button
          onClick={handleOpenModal}
          className="p-2 bg-[var(--main-color)]/10 hover:bg-[var(--main-color)]/20 text-[var(--main-color)] rounded-full transition-all duration-300 border border-[var(--main-color)]/30 hover:scale-105 active:scale-95 shadow-sm shadow-[var(--main-color)]/20"
          title="افتح كاميرا الترجمة الفورية"
        >
          <Camera size={18} />
        </button>
      )}

      {/* 🎥 Deep Glassmorphic Video Translator Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn p-4">
          
          {/* Card Container */}
          <div 
            className="bg-white/95 rounded-[2.5rem] shadow-2xl border border-white/50 p-6 md:p-8 w-full max-w-2xl flex flex-col gap-5 text-[var(--main-internal-color)] relative overflow-hidden" 
            dir="rtl"
          >
            
            {/* Ambient glowing blobs in background */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[var(--main-color)]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[var(--main-hover-color)]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Header Area */}
            <div className="flex justify-between items-center w-full border-b border-gray-100 pb-3 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[var(--main-color)]/10 flex items-center justify-center text-[var(--main-color)]">
                  <Sparkles size={18} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-gray-800 tracking-wide">ترجمة لغة الإشارة الذكية</h3>
                  {/* <p className="text-xs text-gray-500 font-medium">نظام AI متطور يعتمد على التحليل الفوري للمفاصل</p> */}
                </div>
              </div>
              
              <button
                onClick={handleCloseModal}
                disabled={isLoading}
                className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-all duration-200 disabled:opacity-30"
              >
                <X size={20} />
              </button>
            </div>

            {/* Webcam/Interactive Canvas Container */}
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-gray-100 bg-gray-950 flex items-center justify-center shadow-xl group">
              
              {/* HTML5 Video Capture Feed */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover rounded-3xl scale-x-[-1]" // Mirrored for intuitive user coordinate alignment
              />

              {/* Glowing Skeletal Overlay Canvas */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none scale-x-[-1]" // Matches video mirroring
              />

              {/* High-Tech HUD Grid Marks */}
              {isRecording && !isLoading && (
                <div className="absolute inset-0 pointer-events-none border-[12px] border-transparent group-hover:border-white/5 transition-all duration-300 flex flex-col justify-between p-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono tracking-widest text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded shadow-sm flex items-center gap-1.5 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      LIVE AI HUD ACTIVE
                    </span>
                    <span className="text-[10px] font-mono text-gray-400">SYS_FPS: 30.0</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="w-4 h-4 border-b-2 border-r-2 border-white/20" />
                    <div className="w-4 h-4 border-b-2 border-l-2 border-white/20" />
                  </div>
                </div>
              )}

              {/* Loading & Setup Screen overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center gap-3.5 text-white z-20">
                  <Loader2 size={40} className="animate-spin text-[var(--main-color)]" />
                  <p className="font-semibold text-lg animate-pulse tracking-wide text-gray-100">{loadingMessage}</p>
                </div>
              )}

              {/* Idle screen state */}
              {!isRecording && !isLoading && (
                <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-xs flex flex-col items-center justify-center gap-4 text-white z-10 p-6">
                  <div className="w-16 h-16 rounded-full bg-[var(--main-color)]/20 border border-[var(--main-color)]/40 flex items-center justify-center text-[var(--main-color)] shadow-lg shadow-[var(--main-color)]/10 animate-bounce">
                    <Camera size={30} />
                  </div>
                  <div className="text-center max-w-sm">
                    <p className="font-bold text-lg text-gray-100">كاميرا الترجمة جاهزة للتشغيل</p>
                    {/* <p className="text-sm text-gray-300 mt-1">يرجى الضغط على "بدء ترجمة الإشارات" والسماح بصلاحية الكاميرا لبدء فك شفرات الحروف العربية</p> */}
                  </div>
                </div>
              )}

              {/* Interactive guidelines if hand is missing */}
              {isRecording && !isLoading && detectedLandmarks.length === 0 && (
                <div className="absolute bottom-4 inset-x-4 bg-black/60 backdrop-blur-xs rounded-xl p-3 border border-white/10 text-center text-gray-200 text-sm font-semibold animate-pulse z-10">
                  يرجى توجيه كف يدك بالكامل أمام الكاميرا لبدء فك الشفرة الذكي...
                </div>
              )}
            </div>

            {/* Error Message banner */}
            {error && (
              <div className="w-full p-3.5 bg-red-50 border border-red-200/50 rounded-2xl text-center text-red-600 font-bold text-sm relative z-10 animate-shake">
                {error}
              </div>
            )}

            {/* Real-time Predictions & Accumulated speech bubble section */}
            {isRecording && !isLoading && (
              <div className="w-full flex flex-col gap-4 bg-gray-50 border border-gray-100 rounded-3xl p-4 relative z-10">
                
                {/* Visual character capture & preview */}
                <div className="flex items-center justify-between border-b border-gray-200/50 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">الرمز المكتشف حالياً:</div>
                    {predictedChar ? (
                      <div className="px-4 py-1.5 bg-[var(--main-hover-color)] text-white font-extrabold text-xl rounded-xl shadow-md shadow-[var(--main-hover-color)]/20 animate-scaleUp">
                        {predictedChar}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400 font-medium italic">جاري الرصد...</span>
                    )}
                  </div>

                  {/* Smart confirmation indicator */}
                  {predictedChar && (
                    <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      ثبّت يدك 1 ثانية للاعتماد التلقائي
                    </div>
                  )}
                </div>

                {/* Main Speech Bubble display for accumulated word */}
                <div className="flex flex-col gap-1.5">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">الكلمة المترجمة المتراكمة:</div>
                  <div className="min-h-16 w-full p-4 bg-white border border-gray-200/70 rounded-2xl flex items-center justify-center text-center text-gray-800 font-black text-2xl shadow-inner relative overflow-hidden group/speech">
                    {accumulatedWord ? (
                      <span className="text-emerald-700 tracking-wider font-extrabold drop-shadow-xs">{accumulatedWord}</span>
                    ) : (
                      <span className="text-gray-300 italic font-medium text-base">ابدأ بتشكيل الكلمة إشارة تلو الأخرى...</span>
                    )}
                    
                    {/* Glowing highlight inside speech bubble */}
                    <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-[var(--main-color)] to-[var(--main-hover-color)] opacity-0 group-hover/speech:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Hand Keypad manual modifiers for precise translation */}
                <div className="grid grid-cols-3 gap-2.5 mt-1">
                  
                  <button
                    onClick={addSpace}
                    disabled={!accumulatedWord}
                    className="flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-100 active:scale-95 disabled:opacity-40 transition-all rounded-xl font-bold text-sm shadow-xs"
                  >
                    <Space size={16} />
                    إضافة مسافة
                  </button>

                  <button
                    onClick={deleteLastLetter}
                    disabled={!accumulatedWord}
                    className="flex items-center justify-center gap-2 py-2.5 bg-red-50 border border-red-100 text-red-600 hover:bg-red-100 active:scale-95 disabled:opacity-40 transition-all rounded-xl font-bold text-sm shadow-xs"
                  >
                    <Delete size={16} />
                    حذف حرف
                  </button>

                  <button
                    onClick={resetSession}
                    disabled={!accumulatedWord && !predictedChar}
                    className="flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-100 active:scale-95 disabled:opacity-40 transition-all rounded-xl font-bold text-sm shadow-xs"
                  >
                    <RefreshCw size={14} />
                    إعادة ضبط
                  </button>

                </div>

              </div>
            )}

            {/* Bottom Primary Control Actions */}
            <div className="w-full flex gap-3 mt-2 justify-center relative z-10">
              
              {/* Ready/Unconnected state */}
              {!isRecording && !isLoading && (
                <>
                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        startSession(videoRef.current);
                      } else {
                        // Edge case if element isn't rendered, check dynamically
                        setTimeout(() => {
                          const el = document.querySelector("video");
                          if (el) startSession(el);
                        }, 100);
                      }
                    }}
                    className="flex-1 flex items-center justify-center gap-2.5 px-6 py-4 bg-[var(--main-color)] hover:bg-[var(--main-color)]/90 text-white rounded-2xl font-extrabold transition-all shadow-md shadow-[var(--main-color)]/25 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Camera size={18} />
                    بدء ترجمة الإشارات
                  </button>
                  
                  <button
                    onClick={handleCloseModal}
                    className="px-6 py-4 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-2xl font-bold transition-all text-sm"
                  >
                    إلغاء
                  </button>
                </>
              )}

              {/* Connection established / Translating state */}
              {isRecording && !isLoading && (
                <>
                  <button
                    onClick={stopSession}
                    disabled={!accumulatedWord.trim()}
                    className="flex-1 flex items-center justify-center gap-2.5 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-extrabold transition-all shadow-md shadow-emerald-600/25 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <CheckCircle2 size={18} />
                    حفظ الكلمة وإنهاء الجلسة
                  </button>

                  <button
                    onClick={handleCloseModal}
                    className="px-6 py-4 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 rounded-2xl font-bold transition-all text-sm active:scale-95"
                  >
                    إلغاء
                  </button>
                </>
              )}

            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default LiveCamera;

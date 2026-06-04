import { useReactMediaRecorder } from "react-media-recorder-2";
import { Mic, Square, Trash2, Loader2, Send } from "lucide-react";
import { useRef } from "react";
import LiveCamera from '../components/LiveCamera';
import { useVoiceSearch } from "@/features/useVoiceSearch";

interface VoiceRecorderProps {
  onVoiceSuccess?: (data: { location: string; destination: string }) => void;
}

const VoiceRecorder = ({ onVoiceSuccess }: VoiceRecorderProps) => {
  const audioBlobRef = useRef<Blob | null>(null);
  const { sendVoice, isSendingVoice } = useVoiceSearch();

  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      onStop: (_, blob) => (audioBlobRef.current = blob),
    });

  const isRecording = status === "recording";

  async function handleSubmit() {
    const blob = audioBlobRef.current;
    if (!blob) return;

    sendVoice(blob, {
      onSuccess: (data) => {
        console.log("Success:", data);
        clearBlobUrl();
        audioBlobRef.current = null;
        
        if (onVoiceSuccess && data) {
          let parsedInnerData = null;
          try {
            // The AI backend returns the payload as a JSON string inside data.data
            if (typeof data.data === "string") {
              parsedInnerData = JSON.parse(data.data);
            } else if (data.data && typeof data.data === "object") {
              parsedInnerData = data.data;
            }
          } catch (e) {
            console.error("Failed to parse inner data string", e);
          }

          const sourceData = parsedInnerData || data;

          onVoiceSuccess({
            location: sourceData.origin || sourceData.location || sourceData.from || "",
            destination: sourceData.destination || sourceData.to || "",
          });
        }
      }
    });
  }

  return (
    <div className="w-full flex flex-col items-center gap-3 p-2 border-b border-gray-100 bg-gray-50/50 rounded-t-2xl">
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-green-700 tracking-wide uppercase">
          Search by Voice
        </span>
      </div>

      <div className="flex items-center justify-between w-full max-w-md bg-white p-2 px-4 rounded-full shadow-sm border border-gray-200">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isRecording ? "bg-red-500 animate-pulse" : "bg-green-500"}`} />
          <span className="text-xs font-medium text-gray-600 capitalize">
            {isRecording ? "Recording..." : status}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!isRecording ? (
          <div className="dev flex flex-wrap">
              <button
              onClick={startRecording}
              disabled={isSendingVoice}
              className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-full transition-colors disabled:opacity-50"
              title="Start Recording"
            >
              <Mic size={18} />
              
            </button>
            <LiveCamera onTranslationSuccess={(word) => {
              if (onVoiceSuccess) {
                onVoiceSuccess({ location: "", destination: word });
              }
            }}/>
          </div>
            
          ) : (
            <button
              onClick={stopRecording}
              className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-full transition-colors"
              title="Stop Recording"
            >
              <Square size={18} fill="currentColor" />
            </button>
          )}

          {mediaBlobUrl && !isRecording && (
            <button
              onClick={handleSubmit}
              disabled={isSendingVoice}
              className="flex items-center gap-1 p-2 px-3 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-full transition-all shadow-sm active:scale-95 disabled:bg-gray-400"
            >
              {isSendingVoice ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {isSendingVoice ? "Sending..." : "Send"}
            </button>
          )}

          {mediaBlobUrl && !isRecording && !isSendingVoice && (
            <button
              onClick={() => { clearBlobUrl(); audioBlobRef.current = null; }}
              className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full transition-colors"
              title="Clear"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>

      {mediaBlobUrl && (
        <div className="w-full max-w-md animate-in fade-in slide-in-from-top-1">
          <audio src={mediaBlobUrl} controls className="w-full h-8 shadow-sm rounded-lg" />
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
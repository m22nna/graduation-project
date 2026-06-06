import { useMutation } from "@tanstack/react-query";
import { sendVoiceSearch } from "@/services/voiceApi";
import toast from "react-hot-toast";

export function useVoiceSearch() {
  const {
    mutate: sendVoice,
    isPending: isSendingVoice,
    error,
    data,
  } = useMutation({
    mutationFn: (audioBlob: Blob) => sendVoiceSearch(audioBlob),
    onSuccess: () => {
      toast.success("تم معالجة الصوت بنجاح");
    },
    onError: (err: any) => {
      toast.error(err.message || "فشل في معالجة الصوت");
    },
  });

  return { sendVoice, isSendingVoice, error, data };
}

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
      // You can add logic here to handle the successfully recognized text/routes
      // Or let the component handle it via the mutate callback
      toast.success("تم إرسال الصوت بنجاح");
    },
    onError: (err: any) => {
      toast.error(err.message || "فشل في إرسال الصوت");
    },
  });

  return { sendVoice, isSendingVoice, error, data };
}

import { useMutation } from "@tanstack/react-query";
import { submitFeedback } from "@/services/feedbackApi";
import toast from "react-hot-toast";

export function useFeedback(onSuccessCallback?: () => void) {
    return useMutation({
        mutationFn: submitFeedback,
        onSuccess: () => {
            toast.success("Feedback submitted successfully!");
            if (onSuccessCallback) {
                onSuccessCallback();
            }
        },
        onError: (error: any) => {
            console.error("API Error data:", error.response?.data);
            const errorMsg = error.response?.data?.title || error.response?.data?.message || "An error occurred while submitting feedback. Please try again.";
            toast.error(errorMsg);
        },
    });
}

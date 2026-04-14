import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchHistory, deleteTrip, deleteAllHistory } from "../services/historyApi";
import toast from "react-hot-toast";

/**
 * Custom hooks for handling trip history (History & Deletion)
 */

export function useHistory(token: string) {
  return useQuery({
    queryKey: ["history", token],
    queryFn: () => fetchHistory(token),
    enabled: !!token,
  });
}

export function useDeleteTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tripId, userId, token }: { tripId: string; userId: string; token: string }) =>
      deleteTrip(tripId, userId, token),
    onSuccess: () => {
      // Invalidate and refetch history
      queryClient.invalidateQueries({ queryKey: ["history"] });
      toast.success("تم حذف الرحلة بنجاح ");
    },
    onError: (error: any) => {
      console.error("Delete Error:", error);
      toast.error("فشل حذف الرحلة ");
    },
  });
}

/**
 * [MODIFIED] Added hook to clear all history
 */
export function useDeleteAllHistory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, token }: { userId: string; token: string }) =>
      deleteAllHistory(userId, token),
    onSuccess: (_, { token }) => {
      /**
       * [FIX] Manually update cache to empty array for immediate UI refresh
       */
      queryClient.setQueryData(["history", token], []);
      
      // Also invalidate to keep it in sync with server
      queryClient.invalidateQueries({ queryKey: ["history"] });
      
      toast.success("تم مسح السجل بالكامل بنجاح ");
    },
    onError: (error: any) => {
      console.error("Delete All Error:", error);
      toast.error("فشل مسح السجل ");
    },
  });
}

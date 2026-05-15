import { useQuery } from "@tanstack/react-query";
import { fetchGeneralStats } from "../services/statsApi";

export function useStats() {
  return useQuery({
    queryKey: ["general-stats"],
    queryFn: fetchGeneralStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

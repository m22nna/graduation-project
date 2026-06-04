import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createStation,
  updateStation,
  deleteStation,
  fetchStationById,
  fetchAllStations,
} from "../services/stationApi";
import type { CreateStationInput, Station } from "../services/stationApi";

// 1. Get All Stations (Paginated)
export function useAllStations(
  pageIndex: number,
  pageSize: number,
  search: string,
  token: string
) {
  return useQuery({
    queryKey: ["stations", pageIndex, pageSize, search],
    queryFn: () => fetchAllStations(pageIndex, pageSize, search, token),
    enabled: !!token,
  });
}

// 2. Get Station By ID
export function useStationDetails(id: string, token: string) {
  return useQuery({
    queryKey: ["station-details", id],
    queryFn: () => fetchStationById(id, token),
    enabled: !!id && !!token,
  });
}

// 3. Create Station
export function useCreateStation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      input,
      token,
    }: {
      input: CreateStationInput;
      token: string;
    }) => createStation(input, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stations"] });
      toast.success("تم إضافة المحطة بنجاح");
    },
    onError: () => toast.error("فشل إضافة المحطة"),
  });
}

// 4. Update Station
export function useUpdateStation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ station, token }: { station: Station; token: string }) =>
      updateStation(station, token),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["stations"] });
      queryClient.invalidateQueries({
        queryKey: ["station-details", String(variables.station.id)],
      });
      toast.success("تم تعديل المحطة بنجاح");
    },
    onError: () => toast.error("فشل تعديل المحطة"),
  });
}

// 5. Delete Station
export function useDeleteStation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, token }: { id: number; token: string }) =>
      deleteStation(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stations"] });
      toast.success("تم حذف المحطة بنجاح");
    },
    onError: () => toast.error("فشل حذف المحطة"),
  });
}

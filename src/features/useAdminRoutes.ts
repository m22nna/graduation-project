import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  fetchAllRoutes,
  fetchRouteById,
  createRoute,
  updateRoute,
  updateRouteStatus,
  deleteRoute,
} from "../services/adminRoutesApi";
import type { CreateRouteInput, Route } from "../services/adminRoutesApi";

// 1. Get All Routes (Paginated)
export function useAllRoutes(
  pageIndex: number,
  pageSize: number,
  token: string
) {
  return useQuery({
    queryKey: ["admin-routes", pageIndex, pageSize],
    queryFn: () => fetchAllRoutes(pageIndex, pageSize, token),
    enabled: !!token,
  });
}

// 2. Get Route By ID
export function useRouteDetails(id: string, token: string) {
  return useQuery({
    queryKey: ["route-details", id],
    queryFn: () => fetchRouteById(id, token),
    enabled: !!id && !!token,
  });
}

// 3. Create Route
export function useCreateRoute() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      input,
      token,
    }: {
      input: CreateRouteInput;
      token: string;
    }) => createRoute(input, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-routes"] });
      toast.success("تم إضافة الطريق بنجاح");
    },
    onError: () => toast.error("فشل إضافة الطريق"),
  });
}

// 4. Update Route
export function useUpdateRoute() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ route, token }: { route: Route; token: string }) =>
      updateRoute(route, token),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-routes"] });
      queryClient.invalidateQueries({
        queryKey: ["route-details", String(variables.route.id)],
      });
      toast.success("تم تعديل الطريق بنجاح");
    },
    onError: () => toast.error("فشل تعديل الطريق"),
  });
}

// 5. Update Route Status
export function useUpdateRouteStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      status,
      token,
    }: {
      id: number;
      status: number;
      token: string;
    }) => updateRouteStatus(id, status, token),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-routes"] });
      queryClient.invalidateQueries({
        queryKey: ["route-details", String(variables.id)],
      });
      toast.success("تم تحديث حالة الطريق بنجاح");
    },
    onError: () => toast.error("فشل تحديث حالة الطريق"),
  });
}

// 6. Delete Route
export function useDeleteRoute() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, token }: { id: number; token: string }) =>
      deleteRoute(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-routes"] });
      toast.success("تم حذف الطريق بنجاح");
    },
    onError: () => toast.error("فشل حذف الطريق"),
  });
}

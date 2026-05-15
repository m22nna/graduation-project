import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  fetchAllRoles,
  fetchRoleById,
  addRole,
  editRole,
  deleteRole,
  updateUserRoles,
} from "../services/dashboardApi";

// 1. Get All Roles
export function useDashboard(token: string) {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fetchAllRoles(token),
    enabled: !!token,
  });
}

// 2. Get Role By ID
export function useRoleDetails(roleId: string, token: string) {
  return useQuery({
    queryKey: ["role-details", roleId],
    queryFn: () => fetchRoleById(roleId, token),
    enabled: !!roleId && !!token,
  });
}

// 3. Add Role
export function useAddRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ roleName, token }: { roleName: string; token: string }) =>
      addRole(roleName, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("تم إضافة الصلاحية بنجاح");
    },
    onError: () => toast.error("فشل إضافة الصلاحية"),
  });
}

// 4. Edit Role
export function useEditRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name, token }: { id: number; name: string; token: string }) =>
      editRole(id, name, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("تم تعديل الصلاحية بنجاح");
    },
    onError: () => toast.error("فشل تعديل الصلاحية"),
  });
}

// 5. Delete Role
export function useDeleteRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ roleId, token }: { roleId: number; token: string }) =>
      deleteRole(roleId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("تم حذف الصلاحية بنجاح");
    },
    onError: () => toast.error("فشل حذف الصلاحية"),
  });
}

// 6. Update User Roles
export function useUpdateUserRoles() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      roles,
      token,
    }: {
      userId: number;
      roles: string[];
      token: string;
    }) => updateUserRoles(userId, roles, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("تم تحديث صلاحيات المستخدم بنجاح");
    },
    onError: () => toast.error("فشل تحديث صلاحيات المستخدم"),
  });
}
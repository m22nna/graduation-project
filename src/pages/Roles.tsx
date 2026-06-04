import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import RoleFormModal from "@/components/ui/RoleFormModal";
import ConfirmModal from "@/components/ui/ConfirmModal";

import { UserContext } from "@/context/UserContext";

import {
  useDashboard,
  useDeleteRole,
  useEditRole,
  useAddRole,
} from "@/features/useDashboard";

const Roles: React.FC = () => {
  const { userToken, setUserToken } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    error,
    refetch
  } = useDashboard(userToken ?? "");

  const roles = Array.isArray(data) ? data : (data?.roles || data?.data || []);

  const deleteRoleMutation = useDeleteRole();
  const editRoleMutation = useEditRole();
  const addRoleMutation = useAddRole();

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);

  useEffect(() => {
    const err = error as any;
    if (err?.response?.status === 401) {
      setUserToken(null);
      localStorage.removeItem("userToken");
      localStorage.removeItem("userId");
      navigate("/login");
    }
  }, [error, navigate, setUserToken]);

  useEffect(() => {
    if (editRoleMutation.isSuccess || deleteRoleMutation.isSuccess || addRoleMutation.isSuccess) {
      refetch();
      setIsEditModalOpen(false);
      setIsDeleteModalOpen(false);
      setIsAddModalOpen(false);
      setSelectedRole(null);
    }
  }, [editRoleMutation.isSuccess, deleteRoleMutation.isSuccess, addRoleMutation.isSuccess, refetch]);

  const handleEditClick = (role: any) => {
    setSelectedRole(role);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (role: any) => {
    setSelectedRole(role);
    setIsDeleteModalOpen(true);
  };

  const onEditSubmit = (newName: string) => {
    if (selectedRole && userToken) {
      editRoleMutation.mutate({
        id: selectedRole.id,
        name: newName,
        token: userToken,
      });
    }
  };

  const onDeleteConfirm = () => {
    if (selectedRole && userToken) {
      deleteRoleMutation.mutate({
        roleId: selectedRole.id,
        token: userToken,
      });
    }
  };

  const onAddSubmit = (roleName: string) => {
    if (userToken) {
      addRoleMutation.mutate({
        roleName,
        token: userToken,
      });
    }
  };

  if (!userToken) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container mx-auto p-5 text-white">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 text-[var(--main-internal-color)] text-lg font-bold bg-white transition px-5 py-2.5 rounded-3xl hover:opacity-90 shadow-md flex  items-center gap-2"
        >
          رجوع
        </button>

        {isLoading && (
          <p className="text-center text-2xl font-bold">
            ... جاري التحميل
          </p>
        )}

        {!isLoading && roles.length === 0 && (
          <div className="text-center p-10 bg-white/10 rounded-3xl border border-dashed border-gray-600">
            <p className="text-xl mb-4">لا توجد صلاحيات حالياً</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[var(--main-hover-color)] text-white px-6 py-2 rounded-xl transition hover:opacity-80"
            >
              أضف أول صلاحية
            </button>
          </div>
        )}

        {!isLoading && roles.length > 0 && (
          <div className=" p-6 rounded-3xl   ">
            <div className="title w-fit mx-auto mb-10">
              <h2 className="text-3xl font-semibold mb-2 text-white text-center">
                إدارة الصلاحيات التفصيلية
              </h2>
              <hr style={{ color: "var(--main-hover-color)" }} className="border-t-2" />
            </div>

            <table className="w-full border border-gray-700 rounded-2xl overflow-hidden shadow-xl bg-white text-[var(--main-internal-color)] text-lg">
              <thead className="bg-[var(--main-hover-color)] text-white font-bold ">
                <tr>
                  <th className="p-4 text-center">#</th>
                  <th className="p-4 text-center">الاسم</th>
                  <th className="p-4 text-center">التحكم</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-700">
                {roles.map((role: any, index: number) => {
                  const currentName = role.name || role.roleName || "";
                  const isNormalUser = currentName.toLowerCase() === "user";

                  return (
                    <tr
                      key={role.id ?? index}
                      className="group hover:bg-green-50 transition"
                    >
                      <td className="p-4 text-gray-400 text-center">
                        {index + 1}
                      </td>

                      <td className="p-4 font-semibold text-[var(--main-internal-color)] text-center">
                        {currentName || "—"}
                        {isNormalUser && (
                          <span className="mr-2 text-xs px-2 py-1 rounded bg-green-100 text-green-700">
                            مستخدم عادي
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-center">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleEditClick(role)}
                            className="bg-[var(--main-internal-color)] text-white px-3 py-1.5 rounded-lg text-sm transition hover:opacity-80"
                          >
                            تعديل
                          </button>

                          <button
                            onClick={() => handleDeleteClick(role)}
                            className="bg-[var(--main-hover-color)] text-white px-3 py-1.5 rounded-lg text-sm transition"
                          >
                            حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[var(--main-hover-color)] text-white px-8 py-3 rounded-2xl font-bold text-lg transition hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <i className="fa-solid fa-plus text-sm"></i>
                إضافة صلاحية جديدة
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <RoleFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={onEditSubmit}
        initialValue={selectedRole?.name || selectedRole?.roleName || ""}
        title="تعديل الصلاحية"
        isPending={editRoleMutation.isPending}
      />

      <RoleFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={onAddSubmit}
        title="إضافة صلاحية جديدة"
        isPending={addRoleMutation.isPending}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={onDeleteConfirm}
        title="حذف الصلاحية"
        message={`هل أنت متأكد من حذف صلاحية "${selectedRole?.name || selectedRole?.roleName}"؟`}
        isPending={deleteRoleMutation.isPending}
      />
    </div>
  );
};

export default Roles;

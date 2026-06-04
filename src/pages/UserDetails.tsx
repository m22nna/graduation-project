import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import { useAllUsers, useDashboard, useUpdateUserRoles } from "@/features/useDashboard";

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userToken } = useContext(UserContext);

  const { data: usersData, isLoading: isUsersLoading, error: usersError } = useAllUsers(userToken || "");
  const { data: rolesData, isLoading: isRolesLoading, error: rolesError } = useDashboard(userToken || "");
  const updateUserRolesMutation = useUpdateUserRoles();

  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const users = Array.isArray(usersData) ? usersData : (usersData?.data || usersData?.items || []);
  const user = users.find((u: any) => String(u.id || u.userId) === String(id));

  const roles = Array.isArray(rolesData) ? rolesData : (rolesData?.roles || rolesData?.data || []);

  useEffect(() => {
    if (user) {
      const currentRoles = Array.isArray(user.roles)
        ? user.roles.map((r: any) => (typeof r === "string" ? r : r.name || r.roleName || ""))
        : typeof user.roles === "string"
        ? [user.roles]
        : [];
      setSelectedRoles(currentRoles.filter(Boolean));
    }
  }, [user]);

  const handleRoleToggle = (roleName: string) => {
    setSelectedRoles((prev) =>
      prev.includes(roleName)
        ? prev.filter((r) => r !== roleName)
        : [...prev, roleName]
    );
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !userToken) return;

    updateUserRolesMutation.mutate(
      {
        userId: parseInt(id),
        roles: selectedRoles,
        token: userToken,
      },
      {
        onSuccess: () => {
          navigate("/dashboard");
        },
      }
    );
  };

  if (isUsersLoading || isRolesLoading) {
    return <div className="text-center py-20 text-white text-2xl font-bold">جاري التحميل...</div>;
  }

  if (usersError || rolesError || !user) {
    return (
      <div className="container mx-auto p-5 text-white text-center">
        <div className="bg-white rounded-3xl p-8 max-w-2xl mx-auto shadow-2xl border border-gray-100 text-[var(--main-internal-color)]">
          <p className="text-2xl font-bold mb-4">حدث خطأ أو لم يتم العثور على المستخدم</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-[var(--main-hover-color)] text-white px-6 py-2 rounded-xl transition"
          >
            العودة للوحة التحكم
          </button>
        </div>
      </div>
    );
  }

  const userName = user.fullName || user.userName || user.name || "مستخدم غير معروف";

  return (
    <div className="container mx-auto p-5 text-white animate-fadeIn" dir="rtl">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 text-[var(--main-internal-color)] text-lg font-bold bg-white transition px-5 py-2.5 rounded-3xl hover:opacity-90 shadow-md flex items-center gap-2"
        >
          ← العودة للوحة التحكم
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 text-[var(--main-internal-color)] text-right font-sans">
          <div className="flex items-center gap-6 mb-8 border-b border-gray-100 pb-6">
            <div className="w-20 h-20 bg-[var(--main-internal-color)] rounded-full flex items-center justify-center text-3xl font-bold text-white">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--main-internal-color)]">{userName}</h1>
              <p className="text-gray-500 text-lg">البريد الإلكتروني: {user.email || "—"}</p>
              <p className="text-gray-400 text-sm">رقم التعريف: #{id}</p>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[var(--main-internal-color)] mb-4">
                تعديل أدوار المستخدم (User Roles)
              </h3>
              
              {roles.length === 0 ? (
                <p className="text-gray-500">لا توجد أدوار مسجلة بالنظام حالياً.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roles.map((role: any, idx: number) => {
                    const roleName = role.name || role.roleName || "";
                    if (!roleName) return null;
                    const isChecked = selectedRoles.includes(roleName);
                    return (
                      <label
                        key={role.id || idx}
                        className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${
                          isChecked
                            ? "bg-green-50 border-[var(--main-hover-color)]"
                            : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleRoleToggle(roleName)}
                          className="w-5 h-5 text-[var(--main-hover-color)] focus:ring-[var(--main-hover-color)] rounded"
                        />
                        <span className="text-lg font-semibold text-[var(--main-internal-color)]">
                          {roleName}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={updateUserRolesMutation.isPending}
                className="flex-1 bg-[var(--main-internal-color)] hover:bg-[var(--main-hover-color)] text-white py-3 rounded-xl font-bold text-lg transition disabled:opacity-50"
              >
                {updateUserRolesMutation.isPending ? "جاري الحفظ..." : "حفظ التغييرات"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 text-lg rounded-xl font-bold transition"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

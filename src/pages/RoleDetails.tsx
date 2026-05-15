import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import { useRoleDetails, useEditRole, useDeleteRole } from "@/features/useDashboard";
import { toast } from "react-hot-toast";

const RoleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userToken } = useContext(UserContext);

  const { data: role, isLoading, error } = useRoleDetails(id || "", userToken || "");
  const editRoleMutation = useEditRole();
  const deleteRoleMutation = useDeleteRole();

  const [name, setName] = useState("");

  useEffect(() => {
    if (role) {
      setName(role.name || role.roleName || "");
    }
  }, [role]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !userToken) return;

    editRoleMutation.mutate({
      id: parseInt(id),
      name: name,
      token: userToken,
    });
  };

  const handleDelete = () => {
    if (!id || !userToken) return;
    if (window.confirm("هل أنت متأكد من حذف هذه الصلاحية؟")) {
      deleteRoleMutation.mutate(
        { roleId: parseInt(id), token: userToken },
        {
          onSuccess: () => navigate("/dashboard"),
        }
      );
    }
  };

  if (isLoading) return <div className="text-center py-20 text-white text-2xl">جاري التحميل...</div>;
  if (error) return <div className="text-center py-20 text-white text-3xl">حدث خطأ أثناء تحميل البيانات</div>;

  return (
    <div className="container mx-auto p-5 text-white">     

      <div className="bg-white rounded-3xl p-8 max-w-2xl mx-auto shadow-2xl border border-gray-700">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-[var(--main-internal-color)] rounded-full flex items-center justify-center text-3xl font-bold">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{name || "صلاحية غير معروفة"}</h1>
            <p className="text-[var(--main-internal-color)] text-lg pb-5">رقم التعريف: #{id}</p>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-lg font-bold text-[var(--main-internal-color)]">تعديل الصلاحية</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent text-[var(--main-internal-color)] border-[var(--main-internal-color)] rounded-xl px-4 py-3 outline-none transition"
              placeholder="أدخل الاسم الجديد"
            />
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              type="submit"
              disabled={editRoleMutation.isPending}
              className="flex-1 min-w-[150px] bg-[var(--main-internal-color)] hover:bg-[var(--main-hover-color)] py-3 rounded-xl font-bold text-lg transition disabled:opacity-50"
            >
              {editRoleMutation.isPending ? "جاري الحفظ..." : "حفظ التغييرات"}
            </button>
            
            {/* زرار إضافة أدمن يظهر فقط لليوزر العادي */}
            {(role?.name?.toLowerCase() === "user" || role?.roleName?.toLowerCase() === "user") && (
              <button
                type="button"
                onClick={() => navigate("/newadmin")}
                className="flex-1 min-w-[150px] bg-[var(--main-internal-color)] hover:bg-[var(--main-hover-color)] py-3 rounded-xl font-bold text-lg transition"
              >
                 إضافة كـ أدمن
              </button>
            )}

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleteRoleMutation.isPending}
              className="px-6 bg-[var(--main-hover-color)] hover:bg-[var(--main-internal-color)] text-white  border  text-lg rounded-xl font-bold transition disabled:opacity-50"
            >
              {deleteRoleMutation.isPending ? "..." : "حذف"}
            </button>
          </div>
        </form>
      </div>

      <button 
        onClick={() => navigate("/dashboard")}
        className="mt-6 text-[var(--main-internal-color)] text-lg font-bold bg-white transition p-3 rounded-3xl"
      >
        ← العودة للوحة التحكم
      </button>
    </div>
  );
};

export default RoleDetails;

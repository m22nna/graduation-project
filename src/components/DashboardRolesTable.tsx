import React from "react";
import { useNavigate } from "react-router-dom";

interface DashboardRolesTableProps {
  roles: any[];
  isLoading: boolean;
}

export const DashboardRolesTable: React.FC<DashboardRolesTableProps> = ({ roles, isLoading }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <p className="text-center text-2xl font-bold">
        ... جاري التحميل 
      </p>
    );
  }

  if (roles.length === 0) {
    return (
      <div className="text-center p-10 bg-white/10 rounded-3xl border border-dashed border-gray-600">
        <p className="text-xl mb-4">لا توجد صلاحيات حالياً</p>
        <button
          onClick={() => navigate("/dashboard/roles")}
          className="bg-[var(--main-hover-color)] text-white px-6 py-2 rounded-xl transition hover:opacity-80"
        >
          فتح صفحة الصلاحيات
        </button>
      </div>
    );
  }

  return (
    <div className="">
      <div className="title w-fit mx-auto mb-10">
        <h2 className="text-2xl font-semibold mb-2 text-white">
          قائمة الصلاحيات                
        </h2>
        <hr style={{ color: "var(--main-hover-color)" }}  />
      </div>

      <table className="w-full border border-gray-700 rounded-2xl overflow-hidden shadow-xl bg-white text-[var(--main-internal-color)] text-lg">
        <thead className="bg-[var(--main-hover-color)] text-white font-bold ">
          <tr>
            <th className="p-4 text-center">#</th>
            <th className="p-4 text-center">الاسم</th>
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
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => navigate("/dashboard/roles")}
          className="bg-[var(--main-hover-color)] text-white px-8 py-3 rounded-2xl font-bold text-lg transition hover:scale-105 shadow-lg flex items-center gap-2"
        >
                    فتح التفاصيل 
        </button>
      </div>
    </div>
  );
};

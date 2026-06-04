import React from "react";
import { useNavigate } from "react-router-dom";

interface DashboardUsersTableProps {
  users: any[];
  isLoading: boolean;
}

export const DashboardUsersTable: React.FC<DashboardUsersTableProps> = ({ users, isLoading }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <p className="text-center text-2xl font-bold">
        ... جاري التحميل 
      </p>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center p-10 bg-white/10 rounded-3xl border border-dashed border-gray-600">
        <p className="text-xl mb-4">لا يوجد مستخدمون حالياً</p>
      </div>
    );
  }

  return (
    <div className="mt-12 border-t border-white pt-10">
      <div className="title w-fit mx-auto mb-10">
        <h2 className="text-2xl font-semibold mb-2 text-white">
          قائمة المستخدمين
        </h2>
        <hr style={{ color: "var(--main-hover-color)" }} />
      </div>

      <table className="w-full border border-gray-700 rounded-2xl overflow-hidden shadow-xl bg-white text-[var(--main-internal-color)] text-lg">
        <thead className="bg-[var(--main-hover-color)] text-white font-bold">
          <tr>
            <th className="p-4 text-center">#</th>
            <th className="p-4 text-center">الاسم</th>
            <th className="p-4 text-center">البريد الإلكتروني</th>
            {/* <th className="p-4 text-center">الصلاحيات</th> */}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {users.map((u: any, index: number) => {
            // const userRoles = Array.isArray(u.roles)
            //   ? u.roles.map((r: any) => (typeof r === "string" ? r : r.name || r.roleName || ""))
            //   : typeof u.roles === "string"
            //   ? [u.roles]
            //   : [];

            return (
              <tr
                key={u.id || u.userId || index}
                onClick={() => navigate(`/dashboard/user/${u.id || u.userId}`)}
                className="group hover:bg-green-50 transition cursor-pointer text-center"
              >
                <td className="p-4 text-gray-400 font-semibold">
                  {index + 1}
                </td>

                <td className="p-4 font-bold text-[var(--main-internal-color)] group-hover:text-[var(--main-hover-color)] transition">
                  {u.fullName || u.userName || u.name || "—"}
                </td>

                <td className="p-4 text-gray-600 font-semibold" dir="ltr">
                  {u.email || "—"}
                </td>

                {/* <td className="p-4 text-gray-600 font-semibold">
                  <div className="flex flex-wrap justify-center gap-1">
                    {userRoles.length === 0 ? (
                      <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">
                        بدون صلاحية
                      </span>
                    ) : (
                      userRoles.map((roleName: string, rIdx: number) => (
                        <span
                          key={rIdx}
                          className={`text-xs px-2 py-1 rounded ${
                            roleName.toLowerCase() === "admin"
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {roleName}
                        </span>
                      ))
                    )}
                  </div>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

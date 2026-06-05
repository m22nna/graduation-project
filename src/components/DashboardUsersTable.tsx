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

  const displayUsers = users.slice(0, 5);

  return (
    <div className="mt-12 border-t border-white pt-10">
      <div className="title w-fit mx-auto mb-10">
        <h2 className="text-2xl font-semibold mb-2 text-white">
          قائمة المستخدمين
        </h2>
        <hr style={{ color: "var(--main-hover-color)" }} />
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-700 bg-white">
        <table className="w-full text-[var(--main-internal-color)] text-lg">
          <thead className="bg-[var(--main-hover-color)] text-white font-bold">
            <tr>
              <th className="p-4 text-center">#</th>
              <th className="p-4 text-center">الاسم</th>
              <th className="p-4 text-center">البريد الإلكتروني</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {displayUsers.map((u: any, index: number) => {
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => navigate("/dashboard/users")}
          className="bg-[var(--main-hover-color)] text-white px-8 py-3 rounded-2xl font-bold text-lg transition hover:scale-105 shadow-lg flex items-center gap-2"
        >
          عرض كل المستخدمين بالتفاصيل
        </button>
      </div>
    </div>
  );
};

import React from "react";
import { useNavigate } from "react-router-dom";

interface DashboardRoutesTableProps {
  routes: any;
  isLoading: boolean;
  onCreateClick: () => void;
}

export const DashboardRoutesTable: React.FC<DashboardRoutesTableProps> = ({
  routes,
  isLoading,
  onCreateClick,
}) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="mt-12 border-t border-white pt-10">
        <p className="text-center text-2xl font-bold text-white">
          ... جاري تحميل الطرق
        </p>
      </div>
    );
  }

  const routesList = Array.isArray(routes)
    ? routes
    : routes?.data || routes?.items || routes?.routes || [];

  const displayRoutes = routesList.slice(0, 10);

  if (displayRoutes.length === 0) {
    return (
      <div className="mt-12 border-t  pt-10 text-center p-10 bg-white/10 rounded-3xl border border-dashed border-gray-600">
        <p className="text-xl mb-4 text-white">لا توجد طرق حالياً</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/dashboard/routes")}
            className="bg-[var(--main-hover-color)] text-white px-6 py-2 rounded-xl transition hover:opacity-80 font-bold"
          >
            فتح صفحة الطرق
          </button>
          <button
            onClick={onCreateClick}
            className="bg-white text-[var(--main-internal-color)] px-6 py-2 rounded-xl transition hover:opacity-90 font-bold shadow-md"
          >
            إضافة طريق جديد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 border-t border-white pt-10" dir="rtl">
      <div className="title w-fit mx-auto mb-10">
        <h2 className="text-2xl font-semibold mb-2 text-white">
          قائمة الطرق (خطوط السير)
        </h2>
        <hr style={{ color: "var(--main-hover-color)" }} />
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-700 bg-white">
        <table className="w-full text-[var(--main-internal-color)] text-lg">
          <thead className="bg-[var(--main-hover-color)] text-white font-bold text-center">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">اسم الخط</th>
              <th className="p-4">من</th>
              <th className="p-4">إلى</th>
              <th className="p-4">السعر</th>
              <th className="p-4">الحالة</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {displayRoutes.map((route: any, index: number) => {
              return (
                <tr
                  key={route.id ?? index}
                  onClick={() => navigate(`/dashboard/route/${route.id}`)}
                  className="group hover:bg-green-50 transition cursor-pointer text-center"
                >
                  <td className="p-4 text-gray-400 font-semibold">
                    {index + 1}
                  </td>

                  <td className="p-4 font-bold text-[var(--main-internal-color)] group-hover:text-[var(--main-hover-color)] transition">
                    {route.name || "—"}
                  </td>

                  <td className="p-4 text-gray-600 font-semibold">
                    {route.startPoint || "—"}
                  </td>

                  <td className="p-4 text-gray-600 font-semibold">
                    {route.endPoint || "—"}
                  </td>

                  <td className="p-4 font-semibold text-green-700">
                    {route.ticketPrice ?? 0} EGP
                  </td>

                  <td className="p-4 font-semibold">
                    {route.routeStatusId === 1 ? (
                      <span className="text-green-600 bg-green-100 px-2.5 py-1 rounded-full text-sm">
                        نشط
                      </span>
                    ) : (
                      <span className="text-red-600 bg-red-100 px-2.5 py-1 rounded-full text-sm">
                        متوقف
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
        <button
          onClick={() => navigate("/dashboard/routes")}
          className="bg-[var(--main-hover-color)] text-white px-8 py-3 rounded-2xl font-bold text-lg transition hover:scale-105 shadow-lg flex items-center gap-2"
        >
          
          عرض كل الطرق بالتفاصيل 
        </button>

        {/* <button
          onClick={onCreateClick}
          className="bg-white text-[var(--main-internal-color)] px-8 py-3 rounded-2xl font-bold text-lg transition hover:scale-105 shadow-lg flex items-center gap-2 hover:bg-gray-100 border border-gray-200"
        >
          <i className="fa-solid fa-plus text-sm text-[var(--main-internal-color)]"></i>
          إضافة طريق جديد
        </button> */}
      </div>
    </div>
  );
};

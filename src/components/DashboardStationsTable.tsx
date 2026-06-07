import React from "react";
import { useNavigate } from "react-router-dom";

interface DashboardStationsTableProps {
  stations: any[];
  isLoading: boolean;
}

export const DashboardStationsTable: React.FC<DashboardStationsTableProps> = ({ stations, isLoading }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <p className="text-center text-2xl font-bold">
        ... جاري التحميل      </p>
    );
  }

  if (stations.length === 0) {
    return (
      <div className="text-center p-10 bg-white/10 rounded-3xl border border-dashed border-gray-600">
        <p className="text-xl mb-4">لا توجد محطات حالياً</p>
        <button
          onClick={() => navigate("/dashboard/stations")}
          className="bg-[var(--main-hover-color)] text-white px-6 py-2 rounded-xl transition hover:opacity-80"
        >
          فتح صفحة المحطات
        </button>
      </div>
    );
  }

  return (
    <div className="mt-12 border-t border-white pt-10 overflow-x-auto">
      <div className="title w-fit mx-auto mb-10">
        <h2 className="text-2xl font-semibold mb-2 text-white">
          قائمة المحطات
        </h2>
        <hr style={{ color: "var(--main-hover-color)" }} />
      </div>

      <table className="w-full border border-gray-700 rounded-2xl overflow-hidden shadow-xl bg-white text-[var(--main-internal-color)] text-lg">
        <thead className="bg-[var(--main-hover-color)] text-white font-bold">
          <tr>
            <th className="p-4 text-center">#</th>
            <th className="p-4 text-center">الاسم</th>
            <th className="p-4 text-center">خط العرض</th>
            <th className="p-4 text-center">خط الطول</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {stations.map((station: any, index: number) => {
            return (
              <tr
                key={station.id ?? index}
                onClick={() => navigate(`/dashboard/station/${station.id}`)}                          
                className="group hover:bg-green-50 transition cursor-pointer text-center"
              >
                <td className="p-4 text-gray-400 font-semibold">
                  {index + 1}
                </td>

                <td className="p-4 font-bold text-[var(--main-internal-color)] group-hover:text-[var(--main-hover-color)] transition">
                  {station.name || "—"}
                </td>

                <td className="p-4 text-gray-600 font-semibold" dir="ltr">
                  {station.latitude ?? 0}
                </td>

                <td className="p-4 text-gray-600 font-semibold" dir="ltr">
                  {station.longitude ?? 0}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => navigate("/dashboard/stations")}
          className="bg-[var(--main-hover-color)] text-white px-8 py-3 rounded-2xl font-bold text-lg transition hover:scale-105 shadow-lg flex items-center gap-2"
        >
          
          فتح التفاصيل 
        </button>
      </div>
    </div>
  );
};

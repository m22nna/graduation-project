import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import StationFormModal from "@/components/ui/StationFormModal";
import { UserContext } from "@/context/UserContext";
import { useAllStations, useCreateStation } from "@/features/useStations";

const Stations: React.FC = () => {
  const { userToken, setUserToken } = useContext(UserContext);
  const navigate = useNavigate();

  // Search and Pagination states
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 10;

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useAllStations(pageIndex, pageSize, search, userToken ?? "");

  const createStationMutation = useCreateStation();

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const stations = Array.isArray(data)
    ? data
    : data?.data || data?.items || data?.stations || [];

  useEffect(() => {
    if (data) {
      console.log("ALL STATIONS DATA RECEIVED:", data);
      if (stations.length > 0) {
        console.log("First Station Keys:", Object.keys(stations[0]));
        console.log("First Station Raw Object:", stations[0]);
      }
    }
  }, [data, stations]);

  const hasMore = stations.length === pageSize;

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
    if (createStationMutation.isSuccess) {
      refetch();
      setIsAddModalOpen(false);
    }
  }, [createStationMutation.isSuccess, refetch]);

  const onAddSubmit = (stationData: { name: string; latitude: number; longitude: number }) => {
    if (userToken) {
      createStationMutation.mutate({
        input: stationData,
        token: userToken,
      });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPageIndex(1);
    setSearch(searchInput);
  };

  if (!userToken) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container mx-auto p-5 text-white" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 text-[var(--main-internal-color)] text-lg font-bold bg-white transition px-5 py-2.5 rounded-3xl hover:opacity-90 shadow-md flex flex-row-reverse items-center gap-2"
        >
           رجوع
        </button>

        <div className="title w-fit mx-auto mb-10">
          <h2 className="text-3xl font-semibold mb-2 text-white text-center">
            إدارة المحطات التفصيلية
          </h2>
          <hr style={{ color: "var(--main-hover-color)" }} className="border-t-2" />
        </div>


        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="mb-6 flex gap-3 max-w-md mx-auto">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 bg-white text-[var(--main-internal-color)] border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-[var(--main-hover-color)] transition-all"
            placeholder="ابحث عن محطة بالاسم..."
          />
          <button
            type="submit"
            className="bg-[var(--main-hover-color)] hover:opacity-90 text-white px-6 py-2 rounded-xl font-bold transition"
          >
            بحث
          </button>
        </form>

        {isLoading && (
          <p className="text-center text-2xl font-bold py-10">
            ... جاري التحميل
          </p>
        )}

        {!isLoading && stations.length === 0 && (
          <div className="text-center p-10 bg-white/10 rounded-3xl border border-dashed border-gray-600">
            <p className="text-xl mb-4">لا توجد محطات حالياً</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[var(--main-hover-color)] text-white px-6 py-2 rounded-xl transition hover:opacity-80"
            >
              أضف أول محطة
            </button>
          </div>
        )}

        {!isLoading && stations.length > 0 && (
          <div className="rounded-3xl">
            <table className="w-full border border-gray-700 rounded-2xl overflow-hidden shadow-xl bg-white text-[var(--main-internal-color)] text-lg">
              <thead className="bg-[var(--main-hover-color)] text-white font-bold">
                <tr>
                  <th className="p-4 text-center">#</th>
                  <th className="p-4 text-center">اسم المحطة</th>
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
                        {(pageIndex - 1) * pageSize + index + 1}
                      </td>

                      <td className="p-4 font-bold text-[var(--main-internal-color)] group-hover:text-[var(--main-hover-color)] transition">
                        {station.name || "—"}
                      </td>

                      <td className="p-4 font-semibold text-gray-600" dir="ltr">
                        {station.latitude ?? 0}
                      </td>

                      <td className="p-4 font-semibold text-gray-600" dir="ltr">
                        {station.longitude ?? 0}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6 px-2">
              <button
                disabled={pageIndex === 1}
                onClick={() => setPageIndex((prev) => Math.max(prev - 1, 1))}
                className="bg-white text-[var(--main-internal-color)] px-4 py-2 rounded-xl font-bold shadow-md hover:bg-gray-100 disabled:opacity-50 transition"
              >
                السابق
              </button>
              <span className="text-white font-bold">الصفحة {pageIndex}</span>
              <button
                disabled={!hasMore}
                onClick={() => setPageIndex((prev) => prev + 1)}
                className="bg-white text-[var(--main-internal-color)] px-4 py-2 rounded-xl font-bold shadow-md hover:bg-gray-100 disabled:opacity-50 transition"
              >
                التالي
              </button>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[var(--main-hover-color)] text-white px-8 py-3 rounded-2xl font-bold text-lg transition hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <i className="fa-solid fa-plus text-sm"></i>
                إضافة محطة جديدة
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Modal */}
      <StationFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={onAddSubmit}
        title="إضافة محطة جديدة"
        isPending={createStationMutation.isPending}
      />
    </div>
  );
};

export default Stations;

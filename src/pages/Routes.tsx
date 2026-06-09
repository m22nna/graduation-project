import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import RouteFormModal from "@/components/ui/RouteFormModal";
import { UserContext } from "@/context/UserContext";
import { useAllRoutes, useCreateRoute } from "@/features/useAdminRoutes";

const Routes: React.FC = () => {
  const { userToken, setUserToken } = useContext(UserContext);
  const navigate = useNavigate();

  // Search and Pagination states
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 10;

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useAllRoutes(pageIndex, pageSize, userToken ?? "");

  const createRouteMutation = useCreateRoute();

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const routes = Array.isArray(data)
    ? data
    : data?.data || data?.items || data?.routes || [];

  const hasMore = routes.length === pageSize;

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
    if (createRouteMutation.isSuccess) {
      refetch();
      setIsAddModalOpen(false);
    }
  }, [createRouteMutation.isSuccess, refetch]);

  const onAddSubmit = (routeData: {
    name: string;
    startPoint: string;
    endPoint: string;
    region: string;
    description: string;
    ticketPrice: number;
    averageTimeInMinutes: number;
    routeStatusId: number;
  }) => {
    if (userToken) {
      createRouteMutation.mutate({
        input: routeData,
        token: userToken,
      });
    }
  };

  if (!userToken) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container mx-auto p-5 text-white animate-fadeIn" dir="rtl">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 text-[var(--main-internal-color)] text-lg font-bold bg-white transition px-5 py-2.5 rounded-3xl hover:opacity-90 shadow-md flex items-center gap-2"
        >
          رجوع
        </button>

        <div className="title w-fit mx-auto mb-10">
          <h2 className="text-3xl font-semibold mb-2 text-white text-center">
            إدارة خطوط السير (الطرق) التفصيلية
          </h2>
          <hr style={{ color: "var(--main-hover-color)" }} className="border-t-2" />
        </div>

        {isLoading && (
          <p className="text-center text-2xl font-bold py-10">
            جاري التحميل...
          </p>
        )}

        {!isLoading && routes.length === 0 && (
          <div className="text-center p-10 bg-white/10 rounded-3xl border border-dashed border-gray-600">
            <p className="text-xl mb-4">لا توجد طرق حالياً</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[var(--main-hover-color)] text-white px-6 py-2 rounded-xl transition hover:opacity-80 font-bold"
            >
              أضف أول طريق
            </button>
          </div>
        )}

        {!isLoading && routes.length > 0 && (
          <div className="rounded-3xl">
            <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-700 bg-white">
              <table className="w-full text-[var(--main-internal-color)] text-lg">
                <thead className="bg-[var(--main-hover-color)] text-white font-bold">
                  <tr className="text-center">
                    <th className="p-4">#</th>
                    <th className="p-4">اسم الخط</th>
                    <th className="p-4">المنطقة</th>
                    <th className="p-4">من</th>
                    <th className="p-4">إلى</th>
                    <th className="p-4">المدة (دقائق)</th>
                    <th className="p-4">السعر</th>
                    <th className="p-4">الحالة</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {routes.map((route: any, index: number) => {
                    return (
                      <tr
                        key={route.id ?? index}
                        onClick={() => navigate(`/dashboard/route/${route.id}`)}
                        className="group hover:bg-green-50 transition cursor-pointer text-center"
                      >
                        <td className="p-4 text-gray-400 font-semibold">
                          {(pageIndex - 1) * pageSize + index + 1}
                        </td>

                        <td className="p-4 font-bold text-[var(--main-internal-color)] group-hover:text-[var(--main-hover-color)] transition">
                          {route.name || "—"}
                        </td>

                        <td className="p-4 text-gray-600 font-semibold">
                          {route.region || "—"}
                        </td>

                        <td className="p-4 text-gray-600 font-semibold">
                          {route.startPoint || "—"}
                        </td>

                        <td className="p-4 text-gray-600 font-semibold">
                          {route.endPoint || "—"}
                        </td>

                        <td className="p-4 text-gray-600 font-semibold">
                          {route.averageTimeInMinutes ?? 0} دقيقة
                        </td>

                        <td className="p-4 font-semibold text-green-700">
                          {route.ticketPrice ?? 0} EGP
                        </td>

                        <td className="p-4 font-semibold">
                          {/* {route.routeStatusId === 1 ? (
                            <span className="text-green-600 bg-green-100 px-2.5 py-1 rounded-full text-sm">
                              نشط
                            </span>
                          ) : (
                            <span className="text-red-600 bg-red-100 px-2.5 py-1 rounded-full text-sm">
                              متوقف
                            </span>
                          )} */}
                          <span className="px-2.5 py-1 rounded-full text-sm">
  {route.status}
</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

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
                إضافة طريق جديد
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Modal */}
      <RouteFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={onAddSubmit}
        title="إضافة طريق جديد"
        isPending={createRouteMutation.isPending}
      />
    </div>
  );
};

export default Routes;

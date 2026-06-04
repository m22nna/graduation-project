import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import {
  useRouteDetails,
  useUpdateRoute,
  useDeleteRoute,
  useUpdateRouteStatus,
} from "@/features/useAdminRoutes";
import ConfirmModal from "@/components/ui/ConfirmModal";

const RouteDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userToken } = useContext(UserContext);

  const { data: route, isLoading, error } = useRouteDetails(id || "", userToken || "");
  const updateRouteMutation = useUpdateRoute();
  const deleteRouteMutation = useDeleteRoute();
  const updateStatusMutation = useUpdateRouteStatus();

  // Form states
  const [name, setName] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [region, setRegion] = useState("");
  const [description, setDescription] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [averageTimeInMinutes, setAverageTimeInMinutes] = useState("");
  const [routeStatusId, setRouteStatusId] = useState("1");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Extract route details safely
  const routeData = route?.data || route || {};

  useEffect(() => {
    if (routeData && Object.keys(routeData).length > 0) {
      setName(routeData.name || "");
      setStartPoint(routeData.startPoint || "");
      setEndPoint(routeData.endPoint || "");
      setRegion(routeData.region || "");
      setDescription(routeData.description || "");
      setTicketPrice(routeData.ticketPrice?.toString() ?? "0");
      setAverageTimeInMinutes(routeData.averageTimeInMinutes?.toString() ?? "0");
      setRouteStatusId(routeData.routeStatusId?.toString() ?? "1");
    }
  }, [route]);

  useEffect(() => {
    if (updateRouteMutation.isSuccess) {
      navigate("/dashboard/routes");
    }
  }, [updateRouteMutation.isSuccess, navigate]);

  useEffect(() => {
    if (deleteRouteMutation.isSuccess) {
      setIsDeleteModalOpen(false);
      navigate("/dashboard/routes");
    }
  }, [deleteRouteMutation.isSuccess, navigate]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !userToken) return;

    const parsedPrice = parseFloat(ticketPrice);
    const parsedTime = parseInt(averageTimeInMinutes);
    const parsedStatus = parseInt(routeStatusId);

    if (
      name.trim() &&
      startPoint.trim() &&
      endPoint.trim() &&
      region.trim() &&
      !isNaN(parsedPrice) &&
      !isNaN(parsedTime) &&
      !isNaN(parsedStatus)
    ) {
      updateRouteMutation.mutate({
        route: {
          id: parseInt(id),
          name: name.trim(),
          startPoint: startPoint.trim(),
          endPoint: endPoint.trim(),
          region: region.trim(),
          description: description.trim(),
          ticketPrice: parsedPrice,
          averageTimeInMinutes: parsedTime,
          routeStatusId: parsedStatus,
        },
        token: userToken,
      });
    }
  };

  const handleStatusChange = (newStatus: string) => {
    if (!id || !userToken) return;
    const parsedStatus = parseInt(newStatus);
    setRouteStatusId(newStatus);
    updateStatusMutation.mutate({
      id: parseInt(id),
      status: parsedStatus,
      token: userToken,
    });
  };

  const handleDeleteConfirm = () => {
    if (!id || !userToken) return;
    deleteRouteMutation.mutate({
      id: parseInt(id),
      token: userToken,
    });
  };

  if (isLoading) return <div className="text-center py-20 text-white text-2xl font-bold">... جاري التحميل</div>;
  if (error) return <div className="text-center py-20 text-white text-3xl font-bold">حدث خطأ أثناء تحميل البيانات</div>;

  return (
    <div className="container mx-auto p-5 text-white animate-fadeIn" dir="rtl">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard/routes")}
          className="mb-6 text-[var(--main-internal-color)] text-lg font-bold bg-white transition px-5 py-2.5 rounded-3xl hover:opacity-90 shadow-md flex items-center gap-2"
        >
          رجوع
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-[var(--main-internal-color)] rounded-full flex items-center justify-center text-3xl font-bold text-white">
              <i className="fa-solid fa-route"></i>
            </div>
            <div className="text-right">
              <h1 className="text-3xl font-bold text-[var(--main-internal-color)]">{name || "طريق غير معروف"}</h1>
              <p className="text-gray-500 text-lg">رقم التعريف: #{id}</p>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6 text-right">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-bold text-[var(--main-internal-color)] mb-2">اسم الطريق (الخط)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 text-[var(--main-internal-color)] border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--main-hover-color)] transition-all"
                  placeholder="أدخل اسم الخط"
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-[var(--main-internal-color)] mb-2">المنطقة / القطاع</label>
                <input
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-gray-50 text-[var(--main-internal-color)] border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--main-hover-color)] transition-all"
                  placeholder="أدخل المنطقة"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-bold text-[var(--main-internal-color)] mb-2">نقطة البداية</label>
                <input
                  type="text"
                  value={startPoint}
                  onChange={(e) => setStartPoint(e.target.value)}
                  className="w-full bg-gray-50 text-[var(--main-internal-color)] border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--main-hover-color)] transition-all"
                  placeholder="أدخل نقطة البداية"
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-[var(--main-internal-color)] mb-2">نقطة النهاية</label>
                <input
                  type="text"
                  value={endPoint}
                  onChange={(e) => setEndPoint(e.target.value)}
                  className="w-full bg-gray-50 text-[var(--main-internal-color)] border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--main-hover-color)] transition-all"
                  placeholder="أدخل نقطة النهاية"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-bold text-[var(--main-internal-color)] mb-2">سعر التذكرة (EGP)</label>
                <input
                  type="text"
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(e.target.value)}
                  className="w-full bg-gray-50 text-[var(--main-internal-color)] border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--main-hover-color)] transition-all"
                  placeholder="أدخل سعر التذكرة"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-[var(--main-internal-color)] mb-2">متوسط الوقت (بالدقائق)</label>
                <input
                  type="text"
                  value={averageTimeInMinutes}
                  onChange={(e) => setAverageTimeInMinutes(e.target.value)}
                  className="w-full bg-gray-50 text-[var(--main-internal-color)] border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--main-hover-color)] transition-all"
                  placeholder="أدخل متوسط الوقت"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-bold text-[var(--main-internal-color)] mb-2">حالة الطريق</label>
                <select
                  value={routeStatusId}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  disabled={updateStatusMutation.isPending}
                  className="w-full bg-gray-50 text-[var(--main-internal-color)] border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--main-hover-color)] transition-all disabled:opacity-50"
                >
                  <option value="1">نشط (Active)</option>
                  <option value="2">متوقف (Inactive)</option>
                </select>
                {updateStatusMutation.isPending && (
                  <p className="text-sm text-gray-500 mt-1">... جاري تحديث الحالة</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-lg font-bold text-[var(--main-internal-color)] mb-2">وصف الطريق</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-gray-50 text-[var(--main-internal-color)] border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--main-hover-color)] transition-all"
                placeholder="أدخل وصف الطريق"
                rows={3}
              />
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                type="submit"
                disabled={updateRouteMutation.isPending}
                className="flex-1 min-w-[150px] bg-[var(--main-internal-color)] hover:bg-[var(--main-hover-color)] text-white py-3 rounded-xl font-bold text-lg transition disabled:opacity-50"
              >
                {updateRouteMutation.isPending ? "جاري الحفظ" : "حفظ التغييرات"}
              </button>

              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
                disabled={deleteRouteMutation.isPending}
                className="px-6 bg-[var(--main-hover-color)] hover:opacity-90 text-white text-lg rounded-xl font-bold transition disabled:opacity-50"
              >
                {deleteRouteMutation.isPending ? "..." : "حذف الطريق"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="حذف الطريق"
        message={`هل أنت متأكد من حذف طريق "${name}"؟`}
        isPending={deleteRouteMutation.isPending}
      />
    </div>
  );
};

export default RouteDetails;

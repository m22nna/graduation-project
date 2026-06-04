import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import { useStationDetails, useUpdateStation, useDeleteStation } from "@/features/useStations";
import ConfirmModal from "@/components/ui/ConfirmModal";

const StationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userToken } = useContext(UserContext);

  const { data: station, isLoading, error } = useStationDetails(id || "", userToken || "");
  const updateStationMutation = useUpdateStation();
  const deleteStationMutation = useDeleteStation();

  // Form states
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Extract station details safely
  const stationData = station?.data || station || {};

  useEffect(() => {
    if (stationData && Object.keys(stationData).length > 0) {
      setName(stationData.name || "");
      setLatitude(stationData.latitude?.toString() ?? "0");
      setLongitude(stationData.longitude?.toString() ?? "0");
    }
  }, [station]);

  useEffect(() => {
    if (updateStationMutation.isSuccess) {
      navigate("/dashboard/stations");
    }
  }, [updateStationMutation.isSuccess, navigate]);

  useEffect(() => {
    if (deleteStationMutation.isSuccess) {
      setIsDeleteModalOpen(false);
      navigate("/dashboard/stations");
    }
  }, [deleteStationMutation.isSuccess, navigate]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !userToken) return;

    const parsedLat = parseFloat(latitude);
    const parsedLng = parseFloat(longitude);

    if (name.trim() && !isNaN(parsedLat) && !isNaN(parsedLng)) {
      updateStationMutation.mutate({
        station: {
          id: parseInt(id),
          name: name.trim(),
          latitude: parsedLat,
          longitude: parsedLng,
        },
        token: userToken,
      });
    }
  };

  const handleDeleteConfirm = () => {
    if (!id || !userToken) return;
    deleteStationMutation.mutate({
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
          onClick={() => navigate("/dashboard/stations")}
          className="mb-6 text-[var(--main-internal-color)] text-lg font-bold bg-white transition px-5 py-2.5 rounded-3xl hover:opacity-90 shadow-md flex items-center gap-2"
        >
        رجوع
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-[var(--main-internal-color)] rounded-full flex items-center justify-center text-3xl font-bold text-white">
              <i className="fa-solid fa-map-pin"></i>
            </div>
            <div className="text-right">
              <h1 className="text-3xl font-bold text-[var(--main-internal-color)]">{name || "محطة غير معروفة"}</h1>
              <p className="text-gray-500 text-lg">رقم التعريف: #{id}</p>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6 text-right">
            <div>
              <label className="block text-lg font-bold text-[var(--main-internal-color)] mb-2">اسم المحطة</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 text-[var(--main-internal-color)] border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--main-hover-color)] transition-all"
                placeholder="أدخل اسم المحطة"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-bold text-[var(--main-internal-color)] mb-2">خط العرض (Latitude)</label>
                <input
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="w-full bg-gray-50 text-[var(--main-internal-color)] border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--main-hover-color)] transition-all"
                  placeholder="أدخل خط العرض"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-[var(--main-internal-color)] mb-2">خط الطول (Longitude)</label>
                <input
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="w-full bg-gray-50 text-[var(--main-internal-color)] border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--main-hover-color)] transition-all"
                  placeholder="أدخل خط الطول"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                type="submit"
                disabled={updateStationMutation.isPending}
                className="flex-1 min-w-[150px] bg-[var(--main-internal-color)] hover:bg-[var(--main-hover-color)] text-white py-3 rounded-xl font-bold text-lg transition disabled:opacity-50"
              >
                {updateStationMutation.isPending ? "جاري الحفظ" : "حفظ التغييرات"}
              </button>

              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
                disabled={deleteStationMutation.isPending}
                className="px-6 bg-[var(--main-hover-color)] hover:opacity-90 text-white text-lg rounded-xl font-bold transition disabled:opacity-50"
              >
                {deleteStationMutation.isPending ? "..." : "حذف المحطة"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="حذف المحطة"
        message={`هل أنت متأكد من حذف محطة "${name}"؟`}
        isPending={deleteStationMutation.isPending}
      />
    </div>
  );
};

export default StationDetails;

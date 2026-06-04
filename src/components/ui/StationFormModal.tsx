import React, { useState, useEffect } from "react";
import { Modal } from "flowbite-react";

interface StationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; latitude: number; longitude: number }) => void;
  initialValue?: { name: string; latitude: number; longitude: number };
  title: string;
  isPending?: boolean;
}

const StationFormModal: React.FC<StationFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValue,
  title,
  isPending = false,
}) => {
  const [name, setName] = useState(initialValue?.name || "");
  const [latitude, setLatitude] = useState(initialValue?.latitude?.toString() || "");
  const [longitude, setLongitude] = useState(initialValue?.longitude?.toString() || "");

  useEffect(() => {
    if (initialValue) {
      setName(initialValue.name);
      setLatitude(initialValue.latitude.toString());
      setLongitude(initialValue.longitude.toString());
    } else {
      setName("");
      setLatitude("");
      setLongitude("");
    }
  }, [initialValue, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedLat = parseFloat(latitude);
    const parsedLng = parseFloat(longitude);

    if (name.trim() && !isNaN(parsedLat) && !isNaN(parsedLng)) {
      onSubmit({
        name: name.trim(),
        latitude: parsedLat,
        longitude: parsedLng,
      });
    }
  };

  const isFormValid = name.trim() !== "" && latitude.trim() !== "" && longitude.trim() !== "" && !isNaN(parseFloat(latitude)) && !isNaN(parseFloat(longitude));

  return (
    <Modal show={isOpen} onClose={onClose} size="md">
      <div className="relative bg-white rounded-2xl shadow-xl p-8 text-center overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="mb-6 text-2xl font-bold text-[var(--main-internal-color)]">
          {title}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4 text-right">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">اسم المحطة</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-50 text-[var(--main-internal-color)] border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--main-hover-color)] transition-all"
              placeholder="مثال: محطة رمسيس"
              autoFocus
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">خط العرض (Latitude)</label>
            <input
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="w-full bg-gray-50 text-[var(--main-internal-color)] border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--main-hover-color)] transition-all"
              placeholder="مثال: 30.062"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">خط الطول (Longitude)</label>
            <input
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="w-full bg-gray-50 text-[var(--main-internal-color)] border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--main-hover-color)] transition-all"
              placeholder="مثال: 31.246"
              dir="ltr"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button
              type="submit"
              disabled={isPending || !isFormValid}
              className={`flex-1 bg-[var(--main-internal-color)] text-white px-8 py-3 rounded-xl text-lg font-bold shadow-lg hover:bg-[var(--main-hover-color)] transition-all active:scale-95 flex items-center justify-center gap-3 ${
                isPending || !isFormValid ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {isPending && (
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
              )}
              {isPending ? "... جاري الحفظ" : "حفظ"}
            </button>
            
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 px-8 py-3 rounded-xl text-lg font-bold hover:bg-gray-200 transition-all active:scale-95"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default StationFormModal;

import React, { useState, useEffect } from "react";
import { Modal } from "flowbite-react";

interface RouteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    startPoint: string;
    endPoint: string;
    region: string;
    description: string;
    ticketPrice: number;
    averageTimeInMinutes: number;
    routeStatusId: number;
  }) => void;
  initialValue?: {
    name: string;
    startPoint: string;
    endPoint: string;
    region: string;
    description: string;
    ticketPrice: number;
    averageTimeInMinutes: number;
    routeStatusId: number;
  };
  title: string;
  isPending?: boolean;
}

const RouteFormModal: React.FC<RouteFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValue,
  title,
  isPending = false,
}) => {
  const [name, setName] = useState(initialValue?.name || "");
  const [startPoint, setStartPoint] = useState(initialValue?.startPoint || "");
  const [endPoint, setEndPoint] = useState(initialValue?.endPoint || "");
  const [region, setRegion] = useState(initialValue?.region || "");
  const [description, setDescription] = useState(initialValue?.description || "");
  const [ticketPrice, setTicketPrice] = useState(initialValue?.ticketPrice?.toString() || "");
  const [averageTimeInMinutes, setAverageTimeInMinutes] = useState(initialValue?.averageTimeInMinutes?.toString() || "");
  const [routeStatusId, setRouteStatusId] = useState(initialValue?.routeStatusId?.toString() || "1");

  useEffect(() => {
    if (initialValue) {
      setName(initialValue.name);
      setStartPoint(initialValue.startPoint);
      setEndPoint(initialValue.endPoint);
      setRegion(initialValue.region);
      setDescription(initialValue.description);
      setTicketPrice(initialValue.ticketPrice.toString());
      setAverageTimeInMinutes(initialValue.averageTimeInMinutes.toString());
      setRouteStatusId(initialValue.routeStatusId.toString());
    } else {
      setName("");
      setStartPoint("");
      setEndPoint("");
      setRegion("");
      setDescription("");
      setTicketPrice("");
      setAverageTimeInMinutes("");
      setRouteStatusId("1");
    }
  }, [initialValue, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      onSubmit({
        name: name.trim(),
        startPoint: startPoint.trim(),
        endPoint: endPoint.trim(),
        region: region.trim(),
        description: description.trim(),
        ticketPrice: parsedPrice,
        averageTimeInMinutes: parsedTime,
        routeStatusId: parsedStatus,
      });
    }
  };

  const isFormValid =
    name.trim() !== "" &&
    startPoint.trim() !== "" &&
    endPoint.trim() !== "" &&
    region.trim() !== "" &&
    ticketPrice.trim() !== "" &&
    averageTimeInMinutes.trim() !== "" &&
    !isNaN(parseFloat(ticketPrice)) &&
    !isNaN(parseInt(averageTimeInMinutes));

  return (
    <Modal show={isOpen} onClose={onClose} size="lg">
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

        <form onSubmit={handleSubmit} className="space-y-4 text-right" dir="rtl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">اسم الطريق (الخط)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 text-[var(--main-internal-color)] border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[var(--main-hover-color)] transition-all"
                placeholder="مثال: M5"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">المنطقة / القطاع</label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full bg-gray-50 text-[var(--main-internal-color)] border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[var(--main-hover-color)] transition-all"
                placeholder="مثال: التجمع"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">نقطة البداية</label>
              <input
                type="text"
                value={startPoint}
                onChange={(e) => setStartPoint(e.target.value)}
                className="w-full bg-gray-50 text-[var(--main-internal-color)] border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[var(--main-hover-color)] transition-all"
                placeholder="مثال: التجمع الخامس"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">نقطة النهاية</label>
              <input
                type="text"
                value={endPoint}
                onChange={(e) => setEndPoint(e.target.value)}
                className="w-full bg-gray-50 text-[var(--main-internal-color)] border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[var(--main-hover-color)] transition-all"
                placeholder="مثال: التحرير"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">سعر التذكرة (EGP)</label>
              <input
                type="text"
                value={ticketPrice}
                onChange={(e) => setTicketPrice(e.target.value)}
                className="w-full bg-gray-50 text-[var(--main-internal-color)] border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[var(--main-hover-color)] transition-all"
                placeholder="مثال: 40"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">متوسط الوقت (بالدقائق)</label>
              <input
                type="text"
                value={averageTimeInMinutes}
                onChange={(e) => setAverageTimeInMinutes(e.target.value)}
                className="w-full bg-gray-50 text-[var(--main-internal-color)] border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[var(--main-hover-color)] transition-all"
                placeholder="مثال: 90"
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">حالة الطريق</label>
            <select
              value={routeStatusId}
              onChange={(e) => setRouteStatusId(e.target.value)}
              className="w-full bg-gray-50 text-[var(--main-internal-color)] border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[var(--main-hover-color)] transition-all"
            >
              <option value="1">نشط (Active)</option>
              <option value="2">متوقف (Inactive)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">وصف الطريق</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-50 text-[var(--main-internal-color)] border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[var(--main-hover-color)] transition-all"
              placeholder="وصف إضافي عن محطات أو مسار الطريق"
              rows={3}
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

export default RouteFormModal;

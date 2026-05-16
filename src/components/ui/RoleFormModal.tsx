import React, { useState, useEffect } from "react";
import { Modal } from "flowbite-react";

interface RoleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newName: string) => void;
  initialValue?: string;
  title: string;
  isPending?: boolean;
}

const RoleFormModal: React.FC<RoleFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValue = "",
  title,
  isPending = false,
}) => {
  const [name, setName] = useState(initialValue);

  useEffect(() => {
    setName(initialValue);
  }, [initialValue, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-50 text-[var(--main-internal-color)] border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--main-hover-color)] transition-all"
              placeholder="أدخل اسم الصلاحية"
              autoFocus
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              type="submit"
              disabled={isPending || !name.trim()}
              className={`flex-1 bg-[var(--main-internal-color)] text-white px-8 py-3 rounded-xl text-lg font-bold shadow-lg hover:bg-[var(--main-hover-color)] transition-all active:scale-95 flex items-center justify-center gap-3 ${
                isPending ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isPending && (
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
              )}
              {isPending ? "جاري الحفظ..." : "حفظ"}
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

export default RoleFormModal;

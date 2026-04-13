import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "@/context/UserContext";
import toast from "react-hot-toast";

interface DeleteHistoryProps {
  onClearHistory: () => void;
}

const DeleteHistory: React.FC<DeleteHistoryProps> = ({ onClearHistory }) => {
  const { userToken, userId } = useContext(UserContext);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteHistory = async () => {
    if (!userToken) return;

    if (window.confirm("متأكد إنك عايز تمسح السجل كله؟")) {
      setIsDeleting(true);
      try {
        await axios.delete(`http://transguideapi.runasp.net/api/History/DeleteHisrory${userId || ""}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        toast.success("تم مسح السجل بالكامل بنجاح");
        onClearHistory();
      } catch (error) {
        console.error("Failed to delete history:", error);
        toast.error("حصل مشكلة ومقدرناش نمسح السجل");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDeleteHistory}
      disabled={isDeleting}
      className={`bg-white text-[var(--main-internal-color)] hover:bg-[var(--main-hover-color)]  hover:text-white text-lg font-semibold flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 transform active:scale-95 ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
      title="مسح السجل بالكامل"
    >
      {isDeleting ? (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      )}
      مسح السجل بالكامل
    </button>
  );
};

export default DeleteHistory;

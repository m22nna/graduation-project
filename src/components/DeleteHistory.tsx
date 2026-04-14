/**
 * [MODIFIED] Independent component for clearing all search history
 */
import React, { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useDeleteAllHistory } from "@/features/useHistory";

interface DeleteHistoryProps {
  hasHistory: boolean;
}

const DeleteHistory: React.FC<DeleteHistoryProps> = ({ hasHistory }) => {
  const { userToken, userId } = useContext(UserContext);
  const { mutate: clearAllHistory, isPending: isClearing } = useDeleteAllHistory();

  const handleClearAll = () => {
    if (!userToken || !hasHistory) return;

    const confirmClear = window.confirm("هل أنت متأكد من مسح السجل بالكامل؟");
    if (!confirmClear) return;

    clearAllHistory({ userId: userId || "", token: userToken });
  };

  if (!hasHistory) return null;

  return (
    <button
      onClick={handleClearAll}
      disabled={isClearing}
      className={`flex items-center gap-2 px-6 py-2.5 bg-white text-lg font-bold text-[var(--main-internal-color)] rounded-2xl hover:bg-[var(--main-hover-color)] hover:text-white transition-all duration-300 shadow-sm active:scale-95 ${
        isClearing ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isClearing ? (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      ) : (
         <i className="fa-solid fa-broom"></i>
      )
      }
      مسح السجل
    </button>
  );
};

export default DeleteHistory;

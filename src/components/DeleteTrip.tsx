import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "@/context/UserContext";
import {toast} from "react-hot-toast";
interface DeleteTripProps {
  tripId: number;
  onDeleteSuccess: (deletedId: number) => void;
}

const DeleteTrip: React.FC<DeleteTripProps> = ({ tripId, onDeleteSuccess }) => {
  const { userToken, userId } = useContext(UserContext);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!userToken) return;

    if (window.confirm("حذف الرحلة دي؟")) {
      setIsDeleting(true);
      try {
        await axios.delete(`http://transguideapi.runasp.net/api/History/DeleteTrip`, {
          params: {
            userId: userId || "", // Send userId if required
            tripId: tripId.toString()
          },
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        });
        onDeleteSuccess(tripId);
        toast.success("تم حذف الرحلة بنجاح");
      } catch (error) {
        console.error("Failed to delete trip:", error);
        toast.error("حصل مشكلة ومقدرناش نحذف الرحلة");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`bg-[var(--main-hover-color)] text-white font-semibold flex items-center justify-center p-2 rounded-lg transition-all duration-300 transform active:scale-95 ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
      title="حذف الرحلة"
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
    </button>
  );
};

export default DeleteTrip;

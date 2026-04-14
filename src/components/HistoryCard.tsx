/**
 * [MODIFIED] Reusable component for history items
 */
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DeleteTrip from "./ui/DeleteTrip";

interface HistoryCardProps {
  id: string;
  from: string;
  to: string;
  date?: string;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ id, from, to, date }) => {
  const navigate = useNavigate();

  const handleReSearch = () => {
    sessionStorage.setItem("app_searchState", JSON.stringify({ from, to }));
    sessionStorage.setItem("app_autoSearch", "true");
    navigate("/home");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-white  rounded-2xl p-5 shadow-md hover:shadow-lg transition flex flex-col justify-between"
    >
      {/* FROM → TO */}
      <div className="flex flex-row-reverse items-center justify-between bg-gray-50 p-3 rounded-xl text-right">
        <div>
          <p className="text-sm text-gray-400">إلى</p>
          <p className="text-base text-gray-800 font-semibold">{to || "—"}</p>
        </div>

        <span className="text-blue-500 font-bold text-lg px-3">←</span>

        <div>
          <p className="text-sm text-gray-400">من</p>
          <p className="text-base text-gray-800 font-semibold">{from || "—"}</p>
        </div>
      </div>

      {/* DATE */}
      {date && (
        <p className="mt-3 text-xs text-gray-400 text-right">
           {date}
        </p>
      )}

      {/* BUTTONS */}
      <div className="flex justify-between items-center mt-5">
        {/* Delete Component */}
        <DeleteTrip tripId={id} />

        {/* ReSearch */}
        <button
          onClick={handleReSearch}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-xl font-medium transition flex items-center gap-2"
        >
          <i className="fa-solid fa-magnifying-glass text-sm"></i>
          بحث جديد
        </button>
      </div>
    </motion.div>
  );
};

export default HistoryCard;

"use client";

import { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
//import { motion } from "framer-motion";
import { useHistory } from "@/features/useHistory";
import HistoryCard from "@/components/HistoryCard";
import DeleteHistory from "@/components/DeleteHistory";

export default function History() {
  const { userToken, setUserToken } = useContext(UserContext);
  const navigate = useNavigate();

  // Loading history using the new hook
  const { data: history = [], isLoading, error } = useHistory(userToken);

  /**
   * [MODIFIED] Handle Unauthorized (401) error
   */
  useEffect(() => {
    const err = error as any;
    if (err?.response?.status === 401) {
      setUserToken(null);
      localStorage.removeItem("userToken");
      localStorage.removeItem("userId");
      navigate("/login");
    }
  }, [error, setUserToken, navigate]);

  if (!userToken) {
    navigate("/login");
    return null;
  }

  return (
    <div dir="rtl" className="p-5 min-h-screen">
      {/* <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-center">
          سجل الرحلات
        </h1>
      </div> */}

      {isLoading && (
        <p className="text-white text-3xl font-bold text-center">جاري التحميل...</p>
      )}

      {!isLoading && history.length === 0 && (
        <p className="text-white text-3xl font-bold text-center mt-10">
          لا يوجد رحلات بعد
        </p>
      )}

      {/* GRID RESPONSIVE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {history.map((item: any) => (
          <HistoryCard
            key={item.id}
            id={item.id}
            from={item.userLocation}
            to={item.destination}
            date={item.date}
          />
        ))}
      </div>

      {/* DeleteHistory Component [MODIFIED] - Moved to bottom centered */}
      <div className="flex justify-center mt-12 mb-6">
        <DeleteHistory hasHistory={history.length > 0} />
      </div>
    </div>
  );
}
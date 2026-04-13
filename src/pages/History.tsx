
"use client";

import axios from "axios";
import { useEffect, useContext, useState, useRef } from "react";
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DeleteTrip from "../components/DeleteTrip";
import DeleteHistory from "../components/DeleteHistory";

interface RouteHistory {
  id: number;
  userLocation: string;
  userLatitude: number;
  userLongitude: number;
  destination: string;
  destinationLatitude: number;
  destinationLongitude: number;
  [key: string]: any; // fallback for other properties
}

const History: React.FC = () => {
  const { userToken } = useContext(UserContext);
  const navigate = useNavigate();

  const [history, setHistory] = useState<RouteHistory[]>([]);
  
  const handleSearchAgain = (item: RouteHistory) => {
    // Fill the SearchInputs UI inputs using sessionStorage
    sessionStorage.setItem("app_searchState", JSON.stringify({
      from: item.userLocation,
      to: item.destination,
      coordinates: {
        lat: item.userLatitude,
        lng: item.userLongitude,
        accuracy: 10
      }
    }));
    
    // Navigate and auto-trigger the route fetch via HomePage state
    navigate("/home", { state: { searchParams: item } });
  };

  useEffect(() => {
    if (!userToken) {
      navigate("/login");
      return;
    }


    const controller = new AbortController();

    async function getHistory() {
      try {
        const res = await axios.get(
          "http://transguideapi.runasp.net/api/History/MyHistory",
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
            signal: controller.signal,
          }
        );

        const responseData = res.data;
        console.log("🔥 HISTORY API RAW RESPONSE:", responseData);
        
        if (Array.isArray(responseData)) {
          console.log("👉 Setting array directly:", responseData.length, "items");
          setHistory(responseData);
        } else if (responseData && Array.isArray(responseData.data)) {
          console.log("👉 Setting from pagination object:", responseData.data.length, "items");
          setHistory(responseData.data);
        } else if (responseData && Array.isArray(responseData.trips)) {
          console.log("👉 Setting from trips object:", responseData.trips.length, "items");
          setHistory(responseData.trips);
        } else {
          console.log("👉 Unrecognized format, setting empty array");
          setHistory([]);
        }
      } catch (err: any) {
        if (axios.isCancel(err)) {
          console.log("Request cancelled");
          return;
        }

        if (err.response?.status === 401) {
          navigate("/login");
        } else if (err.response?.status === 404) {
          // الباك إند بيرجع 404 لما ميكونش فيه history، فهنحط الـ state بـ array فاضية
          setHistory([]);
        } else {
          console.log(err.response?.data);
        }
      }
    }

    getHistory();

    return () => {
      controller.abort(); // 👈 يلغي أي request قديم
    };
  }, [userToken, navigate]);

  return (
    <div className="p-5 " dir="rtl">
      <h1 className="text-2xl font-bold mb-5 text-center text-white">My History</h1>

      {history.length === 0 ? (
        <p className="text-white text-center text-3xl font-bold my-auto ">No history yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {history.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white shadow-md rounded-2xl p-5  text-right "
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <span className="bg-[var(--main-hover-color)] text-white text-xs font-medium px-2.5 py-1 rounded">من</span>
                  <h2 className="text-lg font-bold text-gray-800">
                    {item.userLocation || "مكان البداية غير معروف"}
                  </h2>
                </div>
                
                <div className="flex items-start gap-2 mt-2">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded">إلى</span>
                  <h2 className="text-lg font-bold text-gray-800">
                    {item.destination || "الوجهة غير معروفة"}
                  </h2>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-100 text-sm flex items-center justify-between">
                 <span className="text-gray-500">📍 بحث محفوظ</span>
                 
                 <div className="flex items-center gap-2">
                   <DeleteTrip 
                     tripId={item.id} 
                     onDeleteSuccess={(id) => setHistory((prev) => prev.filter((trip) => trip.id !== id))} 
                   />
                   <button 
                     onClick={() => handleSearchAgain(item)}
                     className="bg-green-600/10 text-green-700 hover:bg-orange-500 hover:text-white font-semibold flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 transform active:scale-95"
                   >
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                     </svg>
                     بحث تاني
                   </button>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-10 flex justify-center">
          <DeleteHistory onClearHistory={() => setHistory([])} />
        </div>
      )}
    </div>
  );
};

export default History;
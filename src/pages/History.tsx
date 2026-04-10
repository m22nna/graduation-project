// import axios from "axios";
// import { useEffect, useContext } from "react";
// import { UserContext } from "@/context/UserContext";

// const History: React.FC = () => {
//   const { userToken } = useContext(UserContext);

//   useEffect(() => {
//     async function getHistory() {
//       try {
//         const res = await axios.get("http://transguideapi.runasp.net/api/History/MyHistory", {
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//           },
//         });

//         console.log("History Data:", res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     }

//     if (userToken) {
//       getHistory(); // 🔥 ينفذ بس لو عامل login
//     }
//   }, [userToken]);

//   return (
//     <>
//       <h1>History Page</h1>
//     </>
//   );
// };

// export default History;

"use client";

import axios from "axios";
import { useEffect, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

const History: React.FC = () => {
  const { userToken } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getHistory() {
      try {
        console.log("TOKEN:", userToken);

        const res = await axios.get(
          "http://transguideapi.runasp.net/api/History/MyHistory",
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        //  لو مفيش بيانات
        if (
          !res.data ||
          res.data.length === 0 ||
          res.data._errormessage
        ) {
          console.log("No history yet ");
        } else {
          console.log("History Data :", res.data);
        }
      } catch (err: any) {
        console.log("STATUS:", err.response?.status);

        // Unauthorized
        if (err.response?.status === 401) {
          console.log("Unauthorized - لازم login");
          navigate("/login");
        } else {
          console.log("ERROR:", err.response?.data);
        }
      }
    }

    // حماية الصفحة
    if (!userToken) {
      console.log("No token ");
      navigate("/login");
    } else {
      getHistory();
    }
  }, [userToken, navigate]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">History Page</h1>
    </div>
  );
};

export default History;
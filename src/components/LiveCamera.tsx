// import Webcam from "react-webcam";
// import { useRef, useState, useEffect } from "react";

// const LiveCamera = () => {
//   const webcamRef = useRef<Webcam | null>(null);
//   const socketRef = useRef<WebSocket | null>(null);

//   const [running, setRunning] = useState(false);
//   const [result, setResult] = useState("");

//   const start = () => {
//     socketRef.current = new WebSocket("ws://localhost:5000");

//     socketRef.current.onmessage = (msg) => {
//       setResult(msg.data);
//     };

//     setRunning(true);
//   };

//   useEffect(() => {
//     if (!running) return;

//     const interval = setInterval(() => {
//       const imageSrc = webcamRef.current?.getScreenshot();

//       if (imageSrc && socketRef.current?.readyState === 1) {
//         socketRef.current.send(imageSrc); 
//         // 👈 base64 image بدل blob
//       }
//     }, 200);

//     return () => clearInterval(interval);
//   }, [running]);

//   return (
//     <div className="flex flex-col items-center gap-3">

//       <Webcam
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         className="rounded-xl w-96"
//       />

//       <button onClick={start} className="bg-blue-600 text-white px-4 py-2 rounded">
//         Start Live AI
//       </button>

//       <p className="text-green-600 font-bold">
//         AI: {result || "waiting..."}
//       </p>
//     </div>
//   );
// };

// export default LiveCamera;


// import Webcam from "react-webcam";
// import { useRef, useState } from "react";
// import { Send } from "lucide-react";

// const CameraWithSend = () => {
//   const webcamRef = useRef<Webcam | null>(null);

//   const [sending, setSending] = useState(false);

//   //const intervalRef = useRef<NodeJS.Timeout | null>(null);
// const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
//   // 📤 Start sending frames
//   const startSending = () => {
//     if (sending) return;

//     setSending(true);

//     intervalRef.current = setInterval(async () => {
//       const imageSrc = webcamRef.current?.getScreenshot();
//       if (!imageSrc) return;

//       try {
//         const res = await fetch(imageSrc);
//         const blob = await res.blob();

//         const formData = new FormData();
//         formData.append("frame", blob, "frame.jpg");

//         await fetch("http://YOUR-API-HERE/upload", {
//           method: "POST",
//           body: formData,
//         });
//       } catch (err) {
//         console.error(err);
//       }
//     }, 200);
//   };

//   return (
//     <div className="flex flex-col items-center gap-3 p-4">

//       {/* 🎥 Camera */}
//       <Webcam
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         className="w-96 rounded-xl border shadow"
//       />

//       {/* 📤 SEND BUTTON */}
//       <button
//         onClick={startSending}
//         disabled={sending}
//         className={`flex items-center gap-2 px-4 py-2 rounded text-white 
//         ${sending ? "bg-gray-400" : "bg-green-600"}`}
//       >
//         <Send size={16} />
//         {sending ? "Sending..." : "Send"}
//       </button>

//     </div>
//   );
// };

// export default CameraWithSend;



// import Webcam from "react-webcam";
// import { useRef, useState } from "react";
// import { Camera, Send } from "lucide-react";


// const CameraSendClose = () => {
//   const webcamRef = useRef<Webcam | null>(null);
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // 🎥 فتح الكاميرا
//   const startCamera = () => {
//     setOpen(true);
//   };

//   // 📤 Send + ⛔ Close
//   const sendAndClose = async () => {
//     if (!webcamRef.current) return;

//     setLoading(true);

//     try {
//       const imageSrc = webcamRef.current.getScreenshot();
//       if (!imageSrc) return;

//       // تحويل base64 → blob
//       const res = await fetch(imageSrc);
//       const blob = await res.blob();

//       const formData = new FormData();
//       formData.append("frame", blob, "frame.jpg");

//       await fetch("http://YOUR-API-HERE/upload", {
//         method: "POST",
//         body: formData,
//       });

//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//       setOpen(false); // ⛔ يقفل الكاميرا بعد الإرسال
//     }
//   };

//   return (
//     <div className="flex flex-col items-center gap-4">

//       {/* 🎯 Open Camera Button */}
//       {!open && (
//         <button
//           onClick={startCamera}
//           className="p-4 bg-transparent text-white rounded-full "
//         >
//           <Camera size={22} />
//         </button>
//       )}

//       {/* 🎥 Camera */}
//       {open && (
//         <div className="flex flex-col items-center gap-3">

//           <Webcam
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             className="w-96 rounded-xl border shadow"
//           />

//           {/* 🔥 X = Send + Close */}
//           <button
//             onClick={sendAndClose}
//             disabled={loading}
//             className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 disabled:opacity-50"
//           >
//             <Send size={18} />
//           </button>

//           {loading && (
//             <p className="text-sm text-gray-500">Sending...</p>
//           )}

//         </div>
//       )}

//     </div>
//   );
// };

// export default CameraSendClose;

import Webcam from "react-webcam";
import { useRef, useState } from "react";
import { Camera, Send, X } from "lucide-react";

const CameraSendClose = () => {
  const webcamRef = useRef<Webcam | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const startCamera = () => {
    setOpen(true);
  };

  const closeCamera = () => {
    setOpen(false);
  };

  const sendAndClose = async () => {
    if (!webcamRef.current) return;

    setLoading(true);

    try {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) return;

      const res = await fetch(imageSrc);
      const blob = await res.blob();

      const formData = new FormData();
      formData.append("frame", blob, "frame.jpg");

      await fetch("http://YOUR-API-HERE/upload", {
        method: "POST",
        body: formData,
      });

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="flex justify-center items-center ">

      {/* زر فتح الكاميرا */}
      {!open && (
        <button
          onClick={startCamera}
          className="p-4 bg-transparent text-[var(--main-internal-color)] rounded-full "
        >
          <Camera size={22} />
        </button>
      )}

      {/* 🔥 Modal Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          {/* الكارد */}
          <div className="bg-white rounded-2xl shadow-xl p-4 w-[90%] max-w-xl flex flex-col items-center gap-3">

            {/* زرار X للإغلاق */}
            <button
              onClick={closeCamera}
              className="self-end text-gray-500 hover:text-[var(--main-internal-color)]"
            >
              <X />
            </button>

            {/* الكاميرا */}
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full rounded-xl border"
            />

            {/* Send */}
            <button
              onClick={sendAndClose}
              disabled={loading}
              className="p-3 bg-[var(--main-internal-color)] text-white rounded-full disabled:opacity-50"
            >
              <Send size={18} />
            </button>

            {loading && (
              <p className="text-sm text-gray-500">Sending...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraSendClose;
// import { useEffect, useState } from "react";
// import { useStats } from "@/features/useStats";

// interface CounterProps {
//   title: string;
//   endValue: number;
//   duration?: number;
// }

// const Counter = ({ title, endValue, duration = 800 }: CounterProps) => {
//   const [value, setValue] = useState(0);

//   useEffect(() => {
//     let start = 0;
//     const increment = endValue / (duration / 16);
//     const counter = setInterval(() => {
//       start += increment;
//       if (start >= endValue) {
//         start = endValue;
//         clearInterval(counter);
//       }
//       setValue(Math.floor(start));
//     }, 16);
//     return () => clearInterval(counter);
//   }, [endValue, duration]);

//   return (
//     <div className="relative w-44 h-44 flex items-center justify-center">
//       <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
//         <circle
//           cx="88"
//           cy="88"
//           r="80"
//           stroke="var(--main-internal-color)"
//           strokeWidth="6"
//           fill="none"
//         />
//       </svg>
//       <div className="flex flex-col items-center justify-center">
//         <h2 className="text-2xl font-bold" style={{ color: "var(--main-internal-color)" }}>
//           {value}
//         </h2>
//         <p className="mt-2 text-xl mb-2" style={{ color: "var(--main-internal-color)" }}>
//           {title}
//         </p>
//       </div>
//     </div>
//   );
// };

// const StatesSection = () => {
//   const { data: stats, isLoading, isFetching } = useStats();

//   const currentStats = stats || { feedback: 0, history: 0, users: 0 };

//   return (
//     <div className="states mx-auto">
//       <div className="title w-fit m-auto mb-10">
//         <h1 className="text-3xl font-bold mb-1 text-white">احصائيات</h1>
//         <hr style={{ color: "var(--main-hover-color)" }} />
//       </div>

//       <div className="py-20 px-5 rounded-2xl bg-white">
//         {(isLoading || isFetching) && (
//           <p className="text-center text-xl font-bold mb-6 text-[var(--main-internal-color)]">
//             جاري التحديث...
//           </p>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-3">
//           <Counter title="التقييمات" endValue={currentStats.feedback} />
//           <Counter title="الرحلات" endValue={currentStats.history} />
//           <Counter title="المستخدمين" endValue={currentStats.users} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StatesSection;

import { useEffect, useState } from "react";
import { useStats } from "@/features/useStats";

interface CounterProps {
  title: string;
  endValue: number;
  duration?: number;
}

const Counter = ({
  title,
  endValue,
  duration = 800,
}: CounterProps) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;

    const increment = endValue / (duration / 16);

    const counter = setInterval(() => {
      start += increment;

      if (start >= endValue) {
        start = endValue;
        clearInterval(counter);
      }

      setValue(Math.floor(start));
    }, 16);

    return () => clearInterval(counter);
  }, [endValue, duration]);

  return (
    <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 flex items-center justify-center">
      
      <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
        <circle
          cx="50%"
          cy="50%"
          r="42%"
          stroke="var(--main-internal-color)"
          strokeWidth="6"
          fill="none"
        />
      </svg>

      <div className="flex flex-col items-center justify-center text-center px-2">
        
        <h2
          className="text-lg sm:text-2xl font-bold"
          style={{ color: "var(--main-internal-color)" }}
        >
          {value}
        </h2>

        <p
          className="mt-1 text-sm sm:text-lg"
          style={{ color: "var(--main-internal-color)" }}
        >
          {title}
        </p>

      </div>
    </div>
  );
};

const StatesSection = () => {
  const { data: stats, isLoading, isFetching } = useStats();

  const currentStats = stats || {
    feedback: 0,
    history: 0,
    users: 0,
  };

  return (
    <div className="states mx-auto w-full">
      
      <div className="title w-fit m-auto mb-10">
        <h1 className="text-3xl font-bold mb-1 text-white">
          احصائيات
        </h1>

        <hr style={{ color: "var(--main-hover-color)" }} />
      </div>

      <div className="py-10 px-4 sm:px-6 rounded-2xl bg-white overflow-hidden">
        
        {(isLoading || isFetching) && (
          <p className="text-center text-xl font-bold mb-6 text-[var(--main-internal-color)]">
            جاري التحديث...
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 justify-items-center gap-6">
          
          <Counter
            title="التقييمات"
            endValue={currentStats.feedback}
          />

          <Counter
            title="الرحلات"
            endValue={currentStats.history}
          />

          <Counter
            title="المستخدمين"
            endValue={currentStats.users}
          />

        </div>
      </div>
    </div>
  );
};

export default StatesSection;
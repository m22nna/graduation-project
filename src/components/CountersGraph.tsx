import { useEffect, useState } from "react";
import { useStats } from "@/features/useStats";

const CountersGraph = () => {
  const { data: stats, isLoading } = useStats();

  const currentStats = stats || {
    feedback: 0,
    history: 0,
    users: 0,
  };

  const chartData = [
    {
      label: "التقييمات",
      value: currentStats.feedback,
    },
    {
      label: "الرحلات",
      value: currentStats.history,
    },
    {
      label: "المستخدمين",
      value: currentStats.users,
    },
  ];

  const maxValue = Math.max(
    currentStats.feedback,
    currentStats.history,
    currentStats.users,
    1
  );

  const [animatedValues, setAnimatedValues] = useState(
    chartData.map(() => 0)
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedValues(chartData.map((item) => item.value));
    }, 300);

    return () => clearTimeout(timeout);
  }, [
    currentStats.feedback,
    currentStats.history,
    currentStats.users,
  ]);

  const points = animatedValues
    .map((value, index) => {
      const x = 70 + index * 120;

      const y = 260 - (value / maxValue) * 180;

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="w-full">

      <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-10">
        
        {/* <h2
          className="text-2xl font-bold text-center mb-10"
          style={{ color: "var(--main-internal-color)" }}
        >
          الرسم البياني
        </h2> */}

        {isLoading ? (
          <p
            className="text-center text-xl font-bold"
            style={{ color: "var(--main-internal-color)" }}
          >
            جاري التحميل...
          </p>
        ) : (
          <div className="w-full overflow-x-auto">

            <svg
              viewBox="0 0 400 320"
              className="w-full min-w-[350px] h-auto"
            >
              
              {/* محور X */}
              <line
                x1="50"
                y1="260"
                x2="360"
                y2="260"
                stroke="#ccc"
                strokeWidth="2"
              />

              {/* محور Y */}
              <line
                x1="50"
                y1="30"
                x2="50"
                y2="260"
                stroke="#ccc"
                strokeWidth="2"
              />

              {/* الخط */}
              <polyline
                fill="none"
                stroke="var(--main-hover-color)"
                strokeWidth="4"
                points={points}
                className="transition-all duration-1000"
              />

              {/* النقاط */}
              {animatedValues.map((value, index) => {
                const x = 70 + index * 120;

                const y =
                  260 - (value / maxValue) * 180;

                return (
                  <g key={index}>
                    
                    <circle
                      cx={x}
                      cy={y}
                      r="7"
                      fill="var(--main-internal-color)"
                    />

                    {/* القيمة */}
                    <text
                      x={x}
                      y={y - 15}
                      textAnchor="middle"
                      fontSize="16"
                      fill="var(--main-internal-color)"
                      fontWeight="bold"
                    >
                      {value}
                    </text>

                    {/* العنوان */}
                    <text
                      x={x}
                      y="290"
                      textAnchor="middle"
                      fontSize="15"
                      fill="var(--main-internal-color)"
                    >
                      {chartData[index].label}
                    </text>

                  </g>
                );
              })}
            </svg>

          </div>
        )}
      </div>
    </div>
  );
};

export default CountersGraph;
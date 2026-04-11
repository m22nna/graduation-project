import { useEffect, useState } from "react";

interface CounterProps {
  title: string;
  endValue: number;
  duration?: number;
}

const Counter = ({ title, endValue, duration = 2000 }: CounterProps) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = endValue / (duration / 20);

    const counter = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        start = endValue;
        clearInterval(counter);
      }
      setValue(Math.floor(start));
    }, 20);

    return () => clearInterval(counter);
  }, [endValue, duration]);

  return (
    
    // <div className="bg-white border-8 border-[var(--main-internal-color)] w-44 h-44 rounded-full  flex align-middle justify-center flex-col ">
    //   <h2 className="text-2xl font-bold" style={{color:"var(--main-internal-color)"}}>{value}</h2>     
      
    //     <p className=" mt-2 text-xl mb-2" style={{color:"var(--main-internal-color)"}}>{title}</p>   
      
    // </div>

<div className="relative w-44 h-44 flex items-center justify-center">
  
  {/* SVG الدايرة */}
  <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
    <circle
      cx="88"
      cy="88"
      r="80"
      stroke="var(--main-internal-color)"
      strokeWidth="6"
      fill="none"
      strokeDasharray="502"
      strokeDashoffset="502"
      className="animate-draw"
    />
  </svg>

  {/* المحتوى */}
  <div className="flex flex-col items-center justify-center">
    <h2
      className="text-2xl font-bold"
      style={{ color: "var(--main-internal-color)" }}
    >
      {value}
    </h2>

    <p
      className="mt-2 text-xl mb-2"
      style={{ color: "var(--main-internal-color)" }}
    >
      {title}
    </p>
  </div>

</div>
    
  );
};

const StatsSection = () => {
  return (
    <div className="states mx-auto ">
       <div className="title w-fit m-auto mb-10 ">
<h1 className="text-3xl font-bold mb-1 text-white" >احصائيات</h1>
<hr className=" text-base" style={{color:"var(--main-hover-color)"}}></hr>
        </div>
    <div className="py-20 px-5  rounded-2xl bg-white ">
     
      

      <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center gap-3">
        <Counter title="Feedback" endValue={1200} />
        <Counter title="الرحلات" endValue={1200} />
        <Counter title="المستخدمين" endValue={150} />
      </div>
    </div>
    </div>
  );
};

export default StatsSection;
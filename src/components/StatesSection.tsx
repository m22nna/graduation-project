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
    
    <div className="bg-white shadow-md rounded-full w-15 text-center  ">
      <h2 className="text-2xl font-bold" style={{color:"var(--main-internal-color)"}}>{value}</h2>     
      
        <p className=" mt-2 text-xl mb-2" style={{color:"var(--main-internal-color)"}}>{title}</p>   
      
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
    <div className="py-20 px-5  rounded-2xl bg-white container">
     
      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Counter title="المستخدمين" endValue={1200} />
        <Counter title="الرحلات" endValue={1200} />
        <Counter title="الوقت" endValue={150} />
      </div>
    </div>
    </div>
  );
};

export default StatsSection;
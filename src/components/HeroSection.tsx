////
import React from "react";
import BackGroundImage from "../assets/c007c5b09eb00ea20af7df549489d018.jpg";
import { useNavigate } from "react-router-dom";
const HeroSection: React.FC = () => {
  const navigator =useNavigate();
  return (
    <div className="relative w-full h-[50vh] flex items-center justify-center text-white mb-12">

      
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:`url(${BackGroundImage})`,
        }}
      ></div>

      
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

     
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          اعرف اسرع طريق لمشوارك
        </h1>

        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          اكتشف احسن وسيلة مواصلات واوصل لمشوارك فى اسرع وقت
        </p>

      
        <div className="flex items-center justify-center gap-4">
          <button onClick={()=> navigator ("/login")} className="px-6 py-3 bg-transparent border border-white hover:bg-[var(--main-hover-color)] rounded-full text-lg font-semibold" >
        تسجيل الدخول
          </button>

          <button onClick={()=> navigator("/register")} className="px-6 py-3 bg-transparent border border-white hover:bg-[var(--main-hover-color)]  rounded-full text-lg font-semibold" >
           انشاء حساب
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;



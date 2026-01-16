
import StatesSection from "../components/StatesSection";
import QASection from "../components/QASection";
import HeroSection from "../components/HeroSection";
// import Home from "../pages/HomePage";
 import { useNavigate } from "react-router-dom";
function Overview() {
     const navigator=useNavigate();
    return (
        
        <>
        <HeroSection/>
<StatesSection/>
<div className="text-center my-8 ">
        <button
       
          className="px-6 py-3 border bg-white text-[var(--main-internal-color)] border-white w-100 rounded-full hover:bg-[var(--main-hover-color)] hover:text-white text-lg font-semibold container"
          onClick={() => navigator("/home")}
        >
          هتحرك ازاى؟
        </button>
      </div>
<QASection/>

        </>
        // <div>
        //     Overview
        // </div>

    )
}

export default Overview

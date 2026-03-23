
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


<QASection/>

        </>
        // <div>
        //     Overview
        // </div>

    )
}

export default Overview

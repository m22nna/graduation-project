// import { NavLink, useNavigate } from "react-router-dom";
import StatesSection from "../components/StatesSection";
import QASection from "../components/QASection";
//import Logo from "../assets/logo-nobg.png";
// import { useContext, useState } from "react";
// import { UserContext } from "@/context/UserContext";
import HeroSection from "../components/HeroSection";
import AppSidebar from "../components/AppSidebar";
// import Home from "../pages/HomePage";
//import { useNavigate } from "react-router-dom";

function Overview() {
    //const navigator=useNavigate();
    //       const [open, setOpen] = useState(false);
    //          let navigator = useNavigate();
    //     let {userToken, setUserToken} = useContext(UserContext);
    //     let {setUserId} = useContext(UserContext);
    // function LogOut(){
    //     localStorage.removeItem('userToken');
    //     setUserToken(null);
    //      localStorage.removeItem('userId');
    //     setUserId(null);
    //     navigator('/')


    //  const linkClasses = (isActive: boolean) =>
    //     isActive
    //         ? "inline-block text-orange-400 border-b-2 border-orange-400 pb-[2px] " +
    //           "hover:text-orange-300 hover:border-orange-300 " +
    //           "no-underline visited:text-orange-400 transition-all"
    //         : "inline-block text-white pb-[2px] " +
    //           "hover:text-orange-300 hover:border-b-2 hover:border-orange-300 " +
    //           "hover:no-underline transition-all";
    return (

        <>
            <HeroSection />
            <div className="container flex">
                <div className="dev w-1/4 ">
                    <AppSidebar />
                </div>
                <div className="containery w-2/3">
                    <StatesSection />


                    <QASection />
                </div>
                
            </div>



        </>
        // <div>
        //     Overview
        // </div>

    );
};

export default Overview

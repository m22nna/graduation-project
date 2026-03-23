import { UserContext } from "@/context/UserContext";
import type { CredentialResponse } from "@react-oauth/google";
import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
const LoginWithGoogle: React.FC = () => {
    const {setUserToken} = useContext(UserContext);
    const navigate = useNavigate();

 const handelGoogleLogin = async (credentialResponse: CredentialResponse)=>{
    try{
        console.log("Google credential:", credentialResponse.credential);
        if(!credentialResponse .credential){
            //console.log(credentialResponse .credential);
          toast.error("Google Login Failed");
          return;  
        }
       const {data} = await axios.post (`http://transguideapi.runasp.net/api/Auth/google-login`,{ idToken : credentialResponse.credential}) ;
       setUserToken(data.idToken);
        toast.success("Logged in successfully");
        navigate('/');

    }catch(error :any){
 toast.error(error.response?.data?.message || "Google login failed");

    }
 };

  return (
    <div className="flex justify-center my-4 rounded">
      {/* <hr className="text-black"/> */}
      <GoogleLogin 
        onSuccess={handelGoogleLogin}
        onError={() => toast.error("Google login failed")}
      />
      {/* <hr/> */}
    </div>
  );
};

export default LoginWithGoogle;
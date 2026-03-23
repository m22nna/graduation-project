import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import  axios  from "axios";
import {toast} from "react-hot-toast";
//import { UserContext } from "@/context/UserContext";
//import LoginWithGoogle from "@/components/LoginWithGoogle";
import logo from '../assets/logo-nobg.png'
interface VerifyCodeFormValues {
  email: string;
  code: string;
  
}
const VerifyCode: React.FC = () => {
    const [loading ,setLoading]  = useState(false); 
//  let {setUserToken} = useContext(UserContext);
//  let {setUserId} = useContext(UserContext);
 let navigator = useNavigate(); 
   async function verifyCode(values: VerifyCodeFormValues) {
   
   try{
    setLoading(true);
   let {data} = await axios.post(`http://transguideapi.runasp.net/api/Auth/verify-reset-code`, values)
    console.log(data);
    toast.success(data.message);
    //setLoading(false);
    navigator("/login");
    // localStorage.setItem('userToken' ,data.token);
    // localStorage.setItem('userId' , data.userId);
    // setUserToken(data.token);
    // setUserId(data.userId);
  
   }catch(error:any){
    toast.error(error.response?.data?.message);
    setLoading(false);
   }}

   const validationSchema = Yup.object({
           email: Yup.string()
            //  .required("email is required")
             .email("email is invalid"),      
       
             code: Yup.string()
            //  .required("email is required")
           
         });
         
       
         const formik = useFormik<VerifyCodeFormValues>({
             initialValues: {
               email: "", 
               code: "",        
               
             },
             validationSchema,
             onSubmit: verifyCode,
           });
return <>
<form onSubmit={formik.handleSubmit} className="text-[var(--main-internal-color)] body-font py-20 h-screen">
        <div className="container px-5 py-24 bg-white rounded-3xl m-auto">
          <img src={logo} className="w-32 bg-[var(--main-internal-color)] rounded-full mx-auto p-1" />
          <span className="text-[var(--main-internal-color)] text-4xl mb-16"></span>
          <div className="bg-white rounded-3xl max-w-4xl mx-auto p-6 mt-4">
            <div className="flex flex-wrap -m-2">

              {/* Email */}
              <div className="p-2 w-full ">
                <label className="block text-sm font-medium text-[var(--main-internal-color)] mb-1 text-left ps-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full h-12 px-4 rounded-3xl border text-lg"
                />
              </div>
              {formik.errors.email && formik.touched.email && (
                <div className="w-full  bg-green-300 p-3 rounded-2xl text-sm">
                  {formik.errors.email}
                </div>
              )}

               {/* code */}
              <div className="p-2 w-full ">
                <label className="block text-sm font-medium text-[var(--main-internal-color)] mb-1 text-left ps-2">
                  Code
                </label>
                <input
                  type="password"
                  name="code"
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full h-12 px-4 rounded-3xl border text-lg"
                />
              </div>
              {formik.errors.code && formik.touched.code && (
                <div className="w-full  bg-green-300 p-3 rounded-2xl text-sm">
                  {formik.errors.code}
                </div>
              )}
                      

              

              {/* Button */}
              <div className="p-2 w-full mt-4">
                {loading ?
                 <button 
                  type="button"
                  className="mx-auto block bg-[var(--main-internal-color)] text-white text-lg  py-2 px-8 rounded-3xl hover:bg-[var(--main-hover-color)] transition"
                >
                 <i className="fas fa-spinner fa-spin "></i>
                </button> :
                  <button 
                  type="submit"                 
                  className="mx-auto block bg-[var(--main-internal-color)] text-white text-lg  py-3 px-10 rounded-3xl hover:bg-[var(--main-hover-color)] transition"
                >
                  Submit
                </button>
                }                 
                
              </div>

            </div>
          </div>
        </div>
      </form>
</>

};

export default VerifyCode;
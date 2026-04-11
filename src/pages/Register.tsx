import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import  axios  from "axios";
import {toast} from "react-hot-toast";
import logo from '../assets/logo-nobg.png' 

interface RegisterFormValues {
  email: string;
  password: string;
  fullName: string;
  country: string,
  address: string,
  currentLatitude: number,
  currentLongitude: number
  
}

const Register: React.FC = () => {
 const [loading ,setLoading]  = useState(false); 
 let navigator = useNavigate(); 
   async function register(values: RegisterFormValues) {
   
   try{
    setLoading(true);
   let {data} = await axios.post(`http://transguideapi.runasp.net/api/Auth/signup`, values)
    //console.log(data);
    toast.success(data.message);
    //setLoading(false);
    navigator("/login");
  
   }catch(error:any){
    toast.error(error.response?.data?.message);
    setLoading(false);
   }
  }
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("email is invalid"),

      password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z]\w{4,10}$/, "password is invalid ex: Ahmed123"),

    fullName: Yup.string()
      .required("name is required")
      .min(3, "minimum is 3 characters")
      .max(15, "maximum is 15 characters"),

    country: Yup.string()
    .required("country is required"),

    address: Yup.string()
    .required("country is required"),

    
  });

  
  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      email: "",
      password: "",
      fullName: "",
      country: "",
      address: "",
      currentLatitude: 0,
      currentLongitude: 0,
      
    },
    validationSchema,
    onSubmit: register,
  });
  
  return (
    <>
      

      <form onSubmit={formik.handleSubmit} className="text-[var(--main-internal-color)] body-font py-20">
        <div className="container px-5 py-24 mx-auto bg-white rounded-3xl ">
          <img src={logo} className="w-32 bg-[var(--main-internal-color)] rounded-full mx-auto mb-3 p-1" />
          <span className="text-[var(--main-internal-color)] text-4xl mb-16">انشاء حساب</span>
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

               {/* Password */}
              <div className="p-2 w-full ">
                <label className="block text-sm font-medium text-[var(--main-internal-color)] mb-1 text-left ps-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full h-12 px-4 rounded-3xl border text-lg"
                />
              </div>
              {formik.errors.password && formik.touched.password && (
                <div className="w-full  bg-green-300 p-3 rounded-2xl text-sm">
                  {formik.errors.password}
                </div>
              )}


              {/* Name */}
              <div className="p-2 w-full">
                <label className="block text-sm font-medium text-[var(--main-internal-color)] mb-1 text-left ps-2">
                  Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full h-12 px-4 rounded-3xl border text-lg"
                />
              </div>
              {formik.errors.fullName && formik.touched.fullName && (
                <div className="w-full  bg-green-300 p-3 rounded-2xl text-sm">
                  {formik.errors.fullName}
                </div>
              )}

              {/* country */}
              <div className="p-2 w-full">
                <label className="block text-sm font-medium text-[var(--main-internal-color)] mb-1 text-left ps-2">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full h-12 px-4 rounded-3xl border text-lg"
                />
              </div>
              {formik.errors.country && formik.touched.country && (
                <div className="w-full  bg-green-300 p-3 rounded-2xl text-sm">
                  {formik.errors.country}
                </div>
              )}

              {/* address */}
              <div className="p-2 w-full">
                <label className="block text-sm font-medium text-[var(--main-internal-color)] mb-1 text-left ps-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full h-12 px-4 rounded-3xl border text-lg"
                />
              </div>
              {formik.errors.address && formik.touched.address && (
                <div className="w-full  bg-green-300 p-3 rounded-2xl text-sm">
                  {formik.errors.address}
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
                


                <button className="text-lg font-bold text-[var(--main-internal-color hover:text-[var(--main-hover-color)]" onClick={()=> navigator("/login")}>
                  I have an account
                </button>
              </div>

            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";


interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

const Register: React.FC = () => {

  
  function register(values: RegisterFormValues): void {
    console.log(values);
  }

 
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "minimum is 3 characters")
      .max(15, "maximum is 15 characters"),

    email: Yup.string()
      .required("email is required")
      .email("email is invalid"),

    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z]\w{4,10}$/, "password is invalid ex: Ahmed123"),

    rePassword: Yup.string()
      .required("confirm password")
      .oneOf([Yup.ref("password")], "no matching"),

    phone: Yup.string()
      .required("phone number is required")
      .matches(/^(010|011|012|015)[0-9]{8}$/, "egyptian phone numbers only"),
  });

  
  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: register,
  });
  const navigator = useNavigate();
  return (
    <>
      

      <form onSubmit={formik.handleSubmit} className="text-[var(--main-internal-color)] body-font">
        <div className="container px-5 py-24 mx-auto bg-white rounded-3xl">
          <span className="text-[var(--main-internal-color)] text-4xl mb-16">Register</span>
          <div className="bg-white rounded-3xl max-w-4xl mx-auto p-6 mt-4">
            <div className="flex flex-wrap -m-2">

              {/* Name */}
              <div className="p-2 w-full">
                <label className="block text-sm font-medium text-[var(--main-internal-color)] mb-1 text-left ps-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full h-12 px-4 rounded-3xl border"
                />
              </div>
              {formik.errors.name && formik.touched.name && (
                <div className="w-full  bg-green-300 p-3 rounded-2xl text-sm">
                  {formik.errors.name}
                </div>
              )}

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
                  className="w-full h-12 px-4 rounded-3xl border"
                />
              </div>
              {formik.errors.email && formik.touched.email && (
                <div className="w-full  bg-green-300 p-3 rounded-2xl text-sm">
                  {formik.errors.email}
                </div>
              )}

              {/* Phone */}
              <div className="p-2 w-full ">
                <label className="block text-sm font-medium text-[var(--main-internal-color)] mb-1 text-left ps-2">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full h-12 px-4 rounded-3xl border"
                />
              </div>
              {formik.errors.phone && formik.touched.phone && (
                <div className="w-full bg-green-300 p-3 rounded-2xl text-sm">
                  {formik.errors.phone}
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
                  className="w-full h-12 px-4 rounded-3xl border"
                />
              </div>
              {formik.errors.password && formik.touched.password && (
                <div className="w-full  bg-green-300 p-3 rounded-2xl text-sm">
                  {formik.errors.password}
                </div>
              )}

              {/* RePassword */}
              <div className="p-2 w-full ">
                <label className="block text-sm font-medium text-[var(--main-internal-color)] mb-1 text-left ps-2">
                  RePassword
                </label>
                <input
                  type="password"
                  name="rePassword"
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full h-12 px-4 rounded-3xl border"
                />
              </div>
              {formik.errors.rePassword && formik.touched.rePassword && (
                <div className="w-full  bg-green-300 p-3 rounded-2xl text-sm">
                  {formik.errors.rePassword}
                </div>
              )}

              {/* Button */}
              <div className="p-2 w-full mt-4">
                <button onClick={()=> navigator("/login")}
                  type="submit"
                  className="mx-auto block bg-[var(--main-internal-color)] text-white text-lg  py-3 px-10 rounded-3xl hover:bg-[var(--main-hover-color)] transition"
                >
                  Submit
                </button>
                <button className="text-xl text-[var(--main-internal-color hover:text-[var(--main-hover-color)]" onClick={()=> navigator("/login")}>
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

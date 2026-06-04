import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import logo from "../assets/logo-nobg.png";

interface ResetPasswordFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  async function ResetPassword(values: ResetPasswordFormValues) {
    try {
      setLoading(true);
      console.log(values);
      const { data } = await axios.post(
        `https://transguideapi.runasp.net/api/Auth/reset-password`,
        values
      );

      toast.success(data.message);
      navigator("/login");
    } catch (error: any) {
      console.log("ERROR RESPONSE:", error.response?.data);
      toast.error(error.response?.data?.message);
      setLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("email is invalid"),

    password: Yup.string()
      .required("password is required"),
    //.matches(/^[A-Z]\w{4,10}$/, "password is invalid ex: Ahmed123"),

    confirmPassword: Yup.string()
      .required("password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const formik = useFormik<ResetPasswordFormValues>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: ResetPassword,
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="text-[var(--main-internal-color)] body-font py-20 h-screen"
      >
        <div className="container px-5 py-24 bg-white rounded-3xl m-auto">
          <img
            src={logo}
            className="w-32 bg-[var(--main-internal-color)] rounded-full mx-auto p-1"
          />

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
                <div className="w-full bg-green-300 p-3 rounded-2xl text-sm">
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
                <div className="w-full bg-green-300 p-3 rounded-2xl text-sm">
                  {formik.errors.password}
                </div>
              )}

              {/* confirmPassword */}
              <div className="p-2 w-full ">
                <label className="block text-sm font-medium text-[var(--main-internal-color)] mb-1 text-left ps-2">
                  RePassword
                </label>

                <input
                  type="password"
                  name="confirmPassword"   // ✅ FIXED
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full h-12 px-4 rounded-3xl border text-lg"
                />
              </div>

              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <div className="w-full bg-green-300 p-3 rounded-2xl text-sm">
                    {formik.errors.confirmPassword}
                  </div>
                )}

              {/* Button */}
              <div className="p-2 w-full mt-4">
                {loading ? (
                  <button
                    type="button"
                    className="mx-auto block bg-[var(--main-internal-color)] text-white text-lg py-2 px-8 rounded-3xl hover:bg-[var(--main-hover-color)] transition"
                  >
                    <i className="fas fa-spinner fa-spin "></i>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="mx-auto block bg-[var(--main-internal-color)] text-white text-lg py-3 px-10 rounded-3xl hover:bg-[var(--main-hover-color)] transition"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
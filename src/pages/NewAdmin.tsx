import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAddRole } from "@/features/useDashboard";
import logo from "../assets/logo-nobg.png";

interface VerifyRoleFormValues {
  roleName: string;
}

const NewAdmin: React.FC = () => {
  const navigate = useNavigate();
  const addRoleMutation = useAddRole();

  const verifyCode = (values: VerifyRoleFormValues) => {
    const token = localStorage.getItem("userToken");
    if (!token) return;

    addRoleMutation.mutate(
      {
        roleName: values.roleName,
        token: token,
      },
      {
        onSuccess: () => {
          navigate("/dashboard");
        },
      }
    );
  };

  const validationSchema = Yup.object({
    roleName: Yup.string().required("اسم الصلاحية مطلوب"),
  });

  const formik = useFormik<VerifyRoleFormValues>({
    initialValues: {
      roleName: "",
    },
    validationSchema,
    onSubmit: verifyCode,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="text-[var(--main-internal-color)] body-font py-20 h-screen">
      <div className="container px-5 py-24 bg-white rounded-3xl m-auto">
        <img src={logo} className="w-32 bg-[var(--main-internal-color)] rounded-full mx-auto p-1" alt="logo" />
        
        <div className="bg-white rounded-3xl max-w-4xl mx-auto p-6 mt-4">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-full ">
              <label className="block text-sm font-medium text-[var(--main-internal-color)] mb-1 text-left ps-2">
                اسم الصلاحية الجديد
              </label>
              <input
                type="text"
                name="roleName"
                value={formik.values.roleName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full h-12 px-4 rounded-3xl border text-lg"
                placeholder="مثلاً: Admin, Manager..."
              />
            </div>
            
            {formik.errors.roleName && formik.touched.roleName && (
              <div className="w-full bg-red-100 text-red-600 p-3 rounded-2xl text-sm mt-2">
                {formik.errors.roleName}
              </div>
            )}

            <div className="p-2 w-full mt-4">
              <button
                type="submit"
                disabled={addRoleMutation.isPending}
                className="mx-auto block bg-[var(--main-internal-color)] text-white text-lg py-3 px-10 rounded-3xl hover:bg-[var(--main-hover-color)] transition disabled:opacity-50"
              >
                {addRoleMutation.isPending ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "إضافة الصلاحية"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewAdmin;
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";


interface ResetPasswordFormValues {
    fullName: string;
    country: string;
    address: string;
}


const GetUserData: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigator = useNavigate();

    async function ResetPassword(values: ResetPasswordFormValues) {
        try {
            setLoading(true);
            console.log(values);
            const { data } = await axios.post(
                `https://transguideapi.runasp.net/api/Auth/update-logged-user-data`,
                values
            );

            toast.success("تمت العملية بنجاح");
            navigator("/updatepassword");
        } catch (error: any) {
            console.log("ERROR RESPONSE:", error.response?.data);
            toast.error(error.response?.data?.message || "خطا غير معروف");
           
            setLoading(false);
        }
    }

    const validationSchema = Yup.object({
        fullName: Yup.string()
            .required("fullName is required") ,
           

        country: Yup.string()
            .required("country is required"),
        //.matches(/^[A-Z]\w{4,10}$/, "password is invalid ex: Ahmed123"),

        address: Yup.string()
            .required("address is required"),
           
    });

    const formik = useFormik<ResetPasswordFormValues>({
        initialValues: {
            fullName: "",
            country: "",
            address: "",
        },
        validationSchema,
        onSubmit: ResetPassword,
    });

    return (
        <>
            <form
                onSubmit={formik.handleSubmit}
                className="text-[var(--main-internal-color)] body-font py-20 h-screen">
                <div className="container px-5 py-24 bg-white rounded-3xl m-auto">
                    {/* <img src={logo} className="w-32 bg-[var(--main-internal-color)] rounded-full mx-auto p-1"/> */}
                    <p className="text-[var(--main-internal-color)] text-center font-bold text-4xl">المعلومات الشخصية</p>
                    <div className="bg-white rounded-3xl max-w-4xl mx-auto p-6 mt-4">
                        <div className="flex flex-wrap -m-2">
                            {/* name */}
                            <div className="p-2 w-full ">
                                <label className="block text-sm font-medium text-[var(--main-internal-color)] mb-1 text-left ps-2">
                                    Your Name
                                </label>
                                <input type="text" name="fullName" value={formik.values.fullName} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-3xl border text-lg"/>
                            </div>

                            {formik.errors.fullName && formik.touched.fullName && (
                                <div className="w-full bg-green-300 p-3 rounded-2xl text-sm">
                                    {formik.errors.fullName}
                                </div>
                            )}

                            {/* country */}
                            <div className="p-2 w-full ">
                                <label className="block text-sm font-medium text-[var(--main-internal-color)] mb-1 text-left ps-2">
                                    country
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
                                <div className="w-full bg-green-300 p-3 rounded-2xl text-sm">
                                    {formik.errors.country}
                                </div>
                            )}

                            {/* address */}
                            <div className="p-2 w-full ">
                                <label className="block text-sm font-medium text-[var(--main-internal-color)] mb-1 text-left ps-2">
                                Address
                                </label>

                                <input
                                    type="text"
                                    name="address"   // ✅ FIXED
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-12 px-4 rounded-3xl border text-lg"
                                />
                            </div>

                            {formik.errors.address &&
                                formik.touched.address && (
                                    <div className="w-full bg-green-300 p-3 rounded-2xl text-sm">
                                        {formik.errors.address}
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


export default GetUserData;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  
  const [formData, setFormData] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };
const navigator = useNavigate();
  return (
    <>
      <form onSubmit={handleSubmit} className="text-[var(--main-internal-color)] body-font">
        <div className="container px-5 py-24 mx-auto">           
          <div className="bg-white rounded-3xl max-w-4xl mx-auto p-6">
            <span className="text-[var(--main-internal-color)] text-4xl mb-16">Login</span>
            <div className="flex flex-wrap -m-2">

              {/* Email */}
              <div className="p-2 w-full ">
                <label
                  htmlFor="email"
                  className="block text-left text-sm font-medium text-[var(--main-onternal-color)] mb-1 ps-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-3xl border  focus:border-[var(--main-internal-color)] focus:ring-2  outline-none"
                />
              </div>

              {/* Password */}
              <div className="p-2 w-full ">
                <label
                  htmlFor="password"
                  className="block text-left text-sm font-medium text-[var(--main-internal-color)] mb-1 ps-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-3xl border  focus:border-[var(--main-internal-color)] focus:ring-2  outline-none"
                />
              </div>

              {/* Button */}
              <div className="p-2 w-full mt-4">
                <button onClick={()=> navigator("/")}
                  type="submit"
                  className="w-full md:w-auto mx-auto block bg-[var(--main-internal-color)] text-white py-3 px-10 text-lg rounded-3xl hover:bg-[var(--main-hover-color)] transition"
                >
                  Submit
                </button>
                <button className="text-xl text-[var(--main-internal-color)] hover:text-[var(--main-hover-color)]" onClick={()=> navigator("/register")}>
                  I don't have an account
                </button>
              </div>

            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;

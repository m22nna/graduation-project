//import HomePage from "./pages/HomePage";
import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "./components/Loading";
import HomePage from "./pages/HomePage";
import RoutesQA from "./pages/RoutesQA";
import AppLayout from "./components/AppLayout";
import Overview from "./pages/Overview";
import Contact from "./components/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgetPassword from './pages/ForgetPaaword';
import VerifyCode from './pages/VerifyCode';
import ResetPassword from './pages/ResetPassword';
//import ReactDOM from "react-dom/client";
import History from './pages/History'
import AuthLayout from "./components/AuthLayout";
import "./App.css";
import { Toaster } from "react-hot-toast";
import UserContextProvider from "./context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Dashboard from "./pages/Dashboard";
const router = createBrowserRouter([
//  {
//     element: <AppLayout />, //root element
//     // errorElement: <Error />,

//     children: [
//       {
//         path: "/",
//         element: <Overview />,
//       },
//       {
//         path: "/home",
//         element: <HomePage />,
//       },

//       {
//         path: "/routesqa",
//         element: <RoutesQA />,
//       },
//       {
//         path: "/contact",
//         element: <Contact />,
//       },
//       {
//                 path: "/register",
//                 element: <Register />,
//             },
//             {
//                 path: "/login",
//                 element: <Login />,
//             },
//              {
//                 path: "/forgetpassword",
//                 element: <ForgetPassword/>,
//             },
//              {
//                 path: "/verifycode",
//                 element: <VerifyCode />,
//             },
//              {
//                 path: "/resetpassword",
//                 element: <ResetPassword />,
//             },

//     ],
//   },
// ]);
 {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true, // ⭐ دي أهم نقطة
        element: <Overview />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "routesqa",
        element: <RoutesQA />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },

  // 🟢 Auth Layout (من غير Navbar)
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
                 path: "/forgetpassword",
                 element: <ForgetPassword/>,
             },
              {
                 path: "/verifycode",
                 element: <VerifyCode />,
             },
              {
                 path: "/resetpassword",
                 element: <ResetPassword />,
             },

    ],
  },
]);


export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;
  return (
    <>
    <UserContextProvider>
      <GoogleOAuthProvider clientId="11202583079-lia5e3fp87knod8accrqlvnh7u7ldcl6.apps.googleusercontent.com">
        <div className="container">
        {/* <Loading /> */}
        {/* <RouterProvider router={router} /> */}
      </div>
       <RouterProvider router={router} />
      </GoogleOAuthProvider>
      
    </UserContextProvider>
      

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px", marginTop: "20px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "rgb(239 68 68 / var(--tw-text-opacity, 1))",
          },
        }}
      />
    </>
  );
}

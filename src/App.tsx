import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Loading from "./components/Loading";
import HomePage from "./pages/HomePage";
import RoutesQA from "./pages/RoutesQA";
import AppLayout from "./components/AppLayout";
import AuthLayout from "./components/AuthLayout";
import Overview from "./pages/Overview";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgetPassword from './pages/ForgetPaaword';
import VerifyCode from './pages/VerifyCode';
import ResetPassword from './pages/ResetPassword';
import History from './pages/History';
import Dashboard from "./pages/Dashboard";

import UserContextProvider from "./context/UserContext";

import "./App.css";

// Setup React Query Client
const queryClient = new QueryClient();


import UpdateData from "./pages/UpdateData";
import UpdatePassword from "./pages/UpdatePssword";
import NewAdmin from "./pages/NewAdmin";
import RoleDetails from "./pages/RoleDetails";
import Roles from "./pages/Roles";
import Stations from "./pages/Stations";
import StationDetails from "./pages/StationDetails";
import UserDetails from "./pages/UserDetails";
import Routes from "./pages/Routes";
import RouteDetails from "./pages/RouteDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
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
      {
        path: "dashboard/roles",
        element: <Roles />,
      },
      {
        path: "dashboard/role/:id",
        element: <RoleDetails />,
      },
      {
        path: "dashboard/stations",
        element: <Stations />,
      },
      {
        path: "dashboard/station/:id",
        element: <StationDetails />,
      },
      {
        path: "dashboard/routes",
        element: <Routes />,
      },
      {
        path: "dashboard/route/:id",
        element: <RouteDetails />,
      },
      {
        path: "dashboard/user/:id",
        element: <UserDetails />,
      },
      {
        path: "newadmin",
        element: <NewAdmin />,
      },
    ],
  },
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
             {
                 path: "/updatedata",
                 element: <UpdateData />,
             },
             {
                 path: "/updatepassword",
                 element: <UpdatePassword />,
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
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <GoogleOAuthProvider clientId="498310354645-jisalqm98knlr98ggsk5cir2dva3pnh7.apps.googleusercontent.com">
          {/* <div className="container">
            <RouterProvider router={router} />
          </div> */}
          
            <RouterProvider router={router} />
          
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px", marginTop: "20px" }}
            toastOptions={{
              success: { 
                duration: 3000,
                style: { color: "rgb(22 163 74)" } // green-600
              },
              error: { 
                duration: 5000,
                style: { color: "rgb(239 68 68)" } // red-500
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "white",
                color: "rgb(55 65 81)", // gray-700 default text color
              },
            }}
          />
        </GoogleOAuthProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

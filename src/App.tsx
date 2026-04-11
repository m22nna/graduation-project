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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./App.css";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    element: <AppLayout />, //root element
    // errorElement: <Error />,

    children: [
      {
        path: "/",
        element: <Overview />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },

      {
        path: "/routesqa",
        element: <RoutesQA />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div className="container">
        {/* <Loading /> */}
        <RouterProvider router={router} />
      </div>

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
    </QueryClientProvider>
  );
}

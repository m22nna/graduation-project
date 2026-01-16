//import HomePage from "./pages/HomePage";
import { useState,useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
 import Loading from "./components/Loading";
import HomePage from "./pages/HomePage";
import RoutesQA from "./pages/RoutesQA";
import AppLayout from "./components/AppLayout";
import Overview from "./pages/Overview";
import Contact from "./components/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./App.css"

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

export default function App() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <Loading />;
    return (
        <div className="container">
            {/* <Loading /> */}
            <RouterProvider router={router} />
        </div>
    );
}

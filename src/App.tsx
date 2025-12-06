//import HomePage from "./pages/HomePage";
import { useState,useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
 import Loading from "./components/Loading";
import HomePage from "./pages/HomePage";
import RoutesQA from "./pages/RoutesQA";
import AppLayout from "./components/AppLayout";
import Overview from "./pages/Overview";

const router = createBrowserRouter([
    {
        element: <AppLayout />, //root element
        // errorElement: <Error />,

        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/overview",
                element: <Overview />,
            },
            {
                path: "/routesqa",
                element: <RoutesQA />,
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

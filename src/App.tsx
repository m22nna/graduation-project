//import HomePage from "./pages/HomePage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Loading from "./components/Loading";
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
    return (
        <div className="container">
            {/* <Loading /> */}
            <RouterProvider router={router} />
        </div>
    );
}

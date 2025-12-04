import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

function AppLayout() {
    return (
        <div className="header">
            <NavBar />
            <Outlet />

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default AppLayout;

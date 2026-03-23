import { Outlet } from "react-router-dom";


function AuthLayout() {
    return (
        <div className="header">
           
            <Outlet />

           
        </div>
    );
}

export default AuthLayout;

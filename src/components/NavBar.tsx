import { NavLink } from "react-router-dom";
import Logo from "../assets/logo-nobg.png";

const NavBar: React.FC = () => {
    return (
        <nav className="w-full bg-transparent backdrop-blur-sm border-b border-white/30 pt-6 pb-4">
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <NavLink to="/">
                    <img
                        src={Logo}
                        alt="App logo"
                        className="h-8 w-auto sm:h-10 md:h-12"
                    />
                </NavLink>

                {/* Menu */}
                <ul
                    className="
            flex 
            gap-2 sm:gap-4 md:gap-8 
            text-xs sm:text-sm md:text-lg 
            font-semibold 
            text-white
          "
                >
                    {/* ROUTES */}
                    <li>
                        <NavLink
                            to="/routesqa"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-orange-400 border-b-[1.5px] border-orange-400 pb-[2px] hover:text-orange-300 hover:border-orange-300 transition-all"
                                    : "text-white pb-[2px] hover:text-orange-300 hover:border-b-[1.5px] hover:border-orange-300 transition-all"
                            }
                        >
                            Our Routes
                        </NavLink>
                    </li>

                    {/* OVERVIEW */}
                    <li>
                        <NavLink
                            to="/overview"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-orange-400 border-b-[1.5px] border-orange-400 pb-[2px] hover:text-orange-300 hover:border-orange-300 transition-all"
                                    : "text-white pb-[2px] hover:text-orange-300 hover:border-b-[1.5px] hover:border-orange-300 transition-all"
                            }
                        >
                            Overview
                        </NavLink>
                    </li>

                    {/* CONTACT */}
                    <li>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-orange-400 border-b-[1.5px] border-orange-400 pb-[2px] hover:text-orange-300 hover:border-orange-300 transition-all"
                                    : "text-white pb-[2px] hover:text-orange-300 hover:border-b-[1.5px] hover:border-orange-300 transition-all"
                            }
                        >
                            Contact Us
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;

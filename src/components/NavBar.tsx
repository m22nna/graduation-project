import { NavLink } from "react-router-dom";
import Logo from "../assets/logo-nobg.png";
import { useState } from "react";

const NavBar: React.FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* NAV */}
            <nav className="w-full bg-transparent backdrop-blur-sm border-b border-white/30 py-2 sm:py-3 md:py-3">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">

                    {/* Logo */}
                    <NavLink to="/" className="flex-shrink-0">
                        <img
                            src={Logo}
                            alt="App logo"
                            className="h-8 w-12 sm:h-10 md:h-12 sm:w-14 md:w-16 transition-all"
                        />
                    </NavLink>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex gap-6 lg:gap-8 text-white font-semibold text-base lg:text-lg">
                        <li>
                            <NavLink 
                                to="/routesqa" 
                                className="hover:text-orange-300 transition-colors duration-200"
                            >
                                Our Routes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/overview" 
                                className="hover:text-orange-300 transition-colors duration-200"
                            >
                                Overview
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/contact" 
                                className="hover:text-orange-300 transition-colors duration-200"
                            >
                                Contact Us
                            </NavLink>
                        </li>
                    </ul>

                    {/* Hamburger/X Button */}
                    <button
                        className="md:hidden relative w-10 h-10 flex items-center justify-center z-50 bg-transparent border-0 outline-none"
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-5 relative">
                            {/* Line 1 - Top */}
                            <span
                                className={`absolute top-0 left-0 h-0.5 w-full bg-white rounded transform transition-all duration-300 ease-in-out ${
                                    open ? "rotate-45 translate-y-2" : "rotate-0 translate-y-0"
                                }`}
                            ></span>

                            {/* Line 2 - Middle */}
                            <span
                                className={`absolute top-1/2 left-0 h-0.5 w-full bg-white rounded -translate-y-1/2 transition-all duration-300 ease-in-out ${
                                    open ? "opacity-0 scale-0" : "opacity-100 scale-100"
                                }`}
                            ></span>

                            {/* Line 3 - Bottom */}
                            <span
                                className={`absolute bottom-0 left-0 h-0.5 w-full bg-white rounded transform transition-all duration-300 ease-in-out ${
                                    open ? "-rotate-45 -translate-y-2" : "rotate-0 translate-y-0"
                                }`}
                            ></span>
                        </div>
                    </button>
                </div>
            </nav>

            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
                    onClick={() => setOpen(false)}
                ></div>
            )}

            {/* SIDEBAR with Gradient */}
            <div
                className={`fixed top-0 right-0 h-full w-64 sm:w-72 text-white p-6 sm:p-8 transition-transform duration-300 md:hidden z-50 shadow-2xl ${
                    open ? "translate-x-0" : "translate-x-full"
                }`}
                style={{
                    backgroundImage: "linear-gradient(to bottom right, #60ba8b, #32915a, #217c47)"
                }}
            >
                {/* Close X Button */}
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-transparent hover:opacity-80 rounded transition-opacity duration-200"
                    aria-label="Close menu"
                >
                    <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                <ul className="flex flex-col gap-6 sm:gap-8 text-base sm:text-lg font-semibold mt-16 sm:mt-20">
                    <li>
                        <NavLink 
                            to="/routesqa" 
                            onClick={() => setOpen(false)}
                            className="block hover:text-orange-300 transition-colors duration-200 py-2"
                        >
                            Our Routes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/overview" 
                            onClick={() => setOpen(false)}
                            className="block hover:text-orange-300 transition-colors duration-200 py-2"
                        >
                            Overview
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/contact" 
                            onClick={() => setOpen(false)}
                            className="block hover:text-orange-300 transition-colors duration-200 py-2"
                        >
                            Contact Us
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default NavBar;
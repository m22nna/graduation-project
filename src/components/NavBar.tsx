import { NavLink } from "react-router-dom";
import Logo from "../assets/logo-nobg.png";
import { useState } from "react";

const NavBar: React.FC = () => {
    const [open, setOpen] = useState(false);

    // FINAL unified styles for all links
    const linkClasses = (isActive: boolean) =>
        isActive
            ? "inline-block text-orange-400 border-b-2 border-orange-400 pb-[2px] " +
              "hover:text-orange-300 hover:border-orange-300 " +
              "no-underline visited:text-orange-400 transition-all"
            : "inline-block text-white pb-[2px] " +
              "hover:text-orange-300 hover:border-b-2 hover:border-orange-300 " +
              "hover:no-underline transition-all";

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
                    <ul className="hidden md:flex gap-4 lg:gap-8 text-white font-semibold text-base lg:text-lg">
                        <li>
                            <NavLink to="/" className={({ isActive }) => linkClasses(isActive)}>
                                Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/routesqa" className={({ isActive }) => linkClasses(isActive)}>
                                Our Routes
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/overview" className={({ isActive }) => linkClasses(isActive)}>
                                Overview
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/contact" className={({ isActive }) => linkClasses(isActive)}>
                                Contact Us
                            </NavLink>
                        </li>
                    </ul>

                    {/* Hamburger Button */}
                    <button
                        className="md:hidden relative w-10 h-10 flex items-center justify-center z-50 bg-transparent border-0 outline-none"
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-5 relative">
                            <span
                                className={`absolute top-0 left-0 h-0.5 w-full bg-white rounded transform transition-all duration-300 ${
                                    open ? "rotate-45 translate-y-2" : ""
                                }`}
                            ></span>

                            <span
                                className={`absolute top-1/2 left-0 h-0.5 w-full bg-white rounded -translate-y-1/2 transition-all duration-300 ${
                                    open ? "opacity-0 scale-0" : ""
                                }`}
                            ></span>

                            <span
                                className={`absolute bottom-0 left-0 h-0.5 w-full bg-white rounded transform transition-all duration-300 ${
                                    open ? "-rotate-45 -translate-y-2" : ""
                                }`}
                            ></span>
                        </div>
                    </button>
                </div>
            </nav>

            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-64 sm:w-72 text-white p-6 sm:p-8 transition-transform duration-300 md:hidden z-50 shadow-2xl ${
                    open ? "translate-x-0" : "translate-x-full"
                }`}
                style={{
                    backgroundImage: "linear-gradient(to bottom right, #60ba8b, #32915a, #217c47)"
                }}
            >
                {/* Close Button */}
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-transparent hover:opacity-80"
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

                {/* Sidebar Menu */}
                <ul className="flex flex-col gap-6 sm:gap-8 text-base sm:text-lg font-semibold mt-16 sm:mt-20">
                    <li>
                        <NavLink
                            to="/"
                            onClick={() => setOpen(false)}
                            className={({ isActive }) => linkClasses(isActive)}
                        >
                            Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/routesqa"
                            onClick={() => setOpen(false)}
                            className={({ isActive }) => linkClasses(isActive)}
                        >
                            Our Routes
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/overview"
                            onClick={() => setOpen(false)}
                            className={({ isActive }) => linkClasses(isActive)}
                        >
                            Overview
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/contact"
                            onClick={() => setOpen(false)}
                            className={({ isActive }) => linkClasses(isActive)}
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

function Footer() {
    return (
        <footer className="bg-[#0d0d0d] text-gray-400 py-10 mt-10 border-t border-gray-800">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <h2 className="text-lg font-semibold text-green-400 tracking-wide">
                    Smart Transport
                </h2>

                <p className="text-sm text-gray-500 text-center md:text-left max-w-md leading-relaxed">
                    Your smart way to move around the city{" "}
                    <span className="text-orange-400">🚍</span>
                </p>

                <div className="flex gap-6 text-sm">
                    <a
                        href="#"
                        className="text-green-400 hover:text-green-400 transition-colors duration-200"
                    >
                        Home
                    </a>
                    <a
                        href="#"
                        className="text-green-400 hover:text-green-400 transition-colors duration-200"
                    >
                        About
                    </a>
                </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-green-500 via-orange-400 to-green-500 my-6 opacity-60"></div>

            <div className="text-center text-xs text-gray-600 space-y-1">
                <p>
                    © {new Date().getFullYear()}{" "}
                    <span className="text-green-400 font-medium">
                        Smart Transport
                    </span>
                    . All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Logo from "../assets/main-logo.png";
//import Home from "../pages/HomePage";
import Overview from "../pages/Overview";
const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } },
  };

  const logoVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (loading) {
    return (
      <motion.div
        className="flex flex-col justify-center items-center w-full h-screen"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.img
          src={Logo}
          alt="logo"
          style={{ width: 250, height: 250 }}
          className="rounded-full"
          variants={logoVariants}
        />

        <motion.h1
          className="0 mt-4 text-2xl font-bold text-center" style={{color:"var(--main-color)"}}
          variants={titleVariants}
        >
          Tareeqy
        </motion.h1>

        <motion.h2
          className=" mt-2 text-xl opacity-80 text-center"style={{color:"var(--main-color)"}}
          variants={subtitleVariants}
        >
          طريقك أسهل معانا
        </motion.h2>
      </motion.div>
    );
  }

  return <Overview/>
};

export default App;
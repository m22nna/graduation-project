// import { NavLink } from 'react-router-dom';
// import Logo from '../assets/logo-nobg.png';

// function NavBar() {
//     return (
//         <nav>
//             <NavLink to='/'>
//                 <img src={Logo} alt='App logo' />
//             </NavLink>
//             <ul>
//                 <li><NavLink to='/routesqa'>Our Routes</NavLink></li>
//                 <li><NavLink to='/overview'>Overview</NavLink></li>
//             </ul>
//         </nav>
//     )
// }

// export default NavBar

import { NavLink } from "react-router-dom";
import Logo from "../assets/logo-nobg.png";

const NavBar: React.FC = () => {
  return (
    <nav className="w-full bg-transparent backdrop-blur-sm border-b border-white/30 pt-6 pb-4">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/">
          <img
            src={Logo}
            alt="App logo"
            className="h-12 w-auto"
          />
        </NavLink>

        {/* Menu */}
        <ul className="flex gap-8 text-lg font-semibold text-white ">
          
          <li>
            <NavLink
              to="/routesqa"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-400 border-b-2 border-orange-400 pb-1 hover:text-orange-400/70"
                  : "hover:text-orange-400/70 hover:border-b-2 hover:border-orange-400/70 pb-1 transition-all"
              }
            >
              Our Routes
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/overview"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-400 border-b-2 border-orange-400 pb-1 hover:text-orange-400/70"
                  : "hover:text-orange-400/70 hover:border-b-2 hover:border-orange-400/70 pb-1 transition-all"
              }
            >
              Overview
            </NavLink>
          </li>

        </ul>

      </div>
    </nav>
  );
};

export default NavBar;

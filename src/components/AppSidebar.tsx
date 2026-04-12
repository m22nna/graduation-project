
// "use client";

// import {
//   Sidebar,
//   SidebarItem,
//   SidebarItemGroup,
//   SidebarItems,
//   SidebarCollapse,
// } from "flowbite-react";

// import {
//   HiArrowSmRight,
//   HiChartPie,
//   HiInbox,
//   HiUser,
//   HiViewBoards,
//   HiMenu,
//   HiX,
// } from "react-icons/hi";

// import { useState, useContext, useEffect } from "react";
// import type { FC } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "@/context/UserContext";

// const AppSidebar: FC = () => {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);

//   const { userToken, setUserToken, setUserId } = useContext(UserContext);

//   function LogOut() {
//     localStorage.removeItem("userToken");
//     localStorage.removeItem("userId");
//     setUserToken(null);
//     setUserId(null);
//     navigate("/");
//   }

//   // 🔥 يقفل بالـ Escape
//   useEffect(() => {
//     const handleEsc = (e: KeyboardEvent) => {
//       if (e.key === "Escape") setIsOpen(false);
//     };
//     document.addEventListener("keydown", handleEsc);
//     return () => document.removeEventListener("keydown", handleEsc);
//   }, []);

//   return (
//     <>
      
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="lg:hidden p-2 mt-8 mb-4 bg-white border border-gray-200 shadow-md rounded-lg text-[var(--main-internal-color)] hover:bg-gray-50"
//       >
//         {isOpen ? (
//           <HiX className="w-6 h-6 text-black" />
//         ) : (
//           <HiMenu className="w-6 h-6" />
//         )}
//       </button>

//       {/* Overlay */}
//       {isOpen && (
//         <div
//           className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`relative w-60 h-4/5 shadow-xl mt-20 rounded-2xl bg-white border border-gray-200 overflow-hidden sidebar
//         [&_span]:!text-[var(--main-internal-color)]
//         [&_svg]:!text-[var(--main-internal-color)]
//         [&_a:hover,&_button:hover]:!bg-transparent
//         [&_a:hover,&_button:hover,&_a:hover_*,&_button:hover_*]:!text-[var(--main-hover-color)]
//         transition-all duration-300
//         ${
//           isOpen
//             ? "max-lg:fixed max-lg:left-4 max-lg:top-20 max-lg:z-50 max-lg:translate-x-0"
//             : "max-lg:hidden max-lg:-translate-x-full"
//         }
//         lg:block lg:translate-x-0`}
//       >
        
//         {isOpen && (
//           <button
//             onClick={() => setIsOpen(false)}
//             className="lg:hidden absolute top-3 right-3 p-1 rounded-md hover:bg-gray-100 z-50"
//           >
//             <HiX className="w-5 h-5 text-black" />
//           </button>
//         )}

//         <Sidebar
//           aria-label="App sidebar"
//           className="w-full h-full [&>div]:bg-white [&>div]:border-none"
//         >
//           <SidebarItems>
//             <SidebarItemGroup>
//               <SidebarItem href="#" icon={HiChartPie} className="my-5" onClick={()=> navigate("/dashboard")}>
//                 Dashboard
//               </SidebarItem>

//               <SidebarItem
//                 icon={HiViewBoards}
//                 label="Pro"
//                 labelColor="dark"
//                 onClick={() => navigate("/history")}
//                 className="my-5"
//               >
//                 History
//               </SidebarItem>

//               <SidebarItem
//                 href="#"
//                 icon={HiInbox}
//                 label="3"
//                 className="my-5"
//               >
//                 Inbox
//               </SidebarItem>

//               <SidebarCollapse
//                 icon={HiUser}
//                 label="Users"
//                 className="my-5"
//               >
//                 <SidebarItem href="#">Update User Data</SidebarItem>
//                 <SidebarItem href="#">Update Password</SidebarItem>
//               </SidebarCollapse>

              
//               {userToken && (
//                 <SidebarItem
//                   href="#"
//                   icon={HiArrowSmRight}
//                   onClick={LogOut}
//                   className="my-5"
//                 >
//                   Log out
//                 </SidebarItem>
//               )}
//             </SidebarItemGroup>
//           </SidebarItems>
//         </Sidebar>
//       </div>
//     </>
//   );
// };

// export default AppSidebar;

"use client";

import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarCollapse,
  Modal,
} from "flowbite-react";

import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiUser,
  HiViewBoards,
  HiMenu,
  HiX,
  HiExclamationCircle,
} from "react-icons/hi";

import { useState, useContext, useEffect } from "react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";


const AppSidebar: FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { userToken, setUserToken, setUserId } =
    useContext(UserContext);

  function LogOut() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    setUserToken(null);
    setUserId(null);
    navigate("/");
  }

  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2 mt-8 mb-4 bg-white border border-gray-200 shadow-md rounded-lg text-[var(--main-internal-color)] hover:bg-gray-50"
      >
        {isOpen ? (
          <HiX className="w-6 h-6 text-black" />
        ) : (
          <HiMenu className="w-6 h-6" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`relative w-60 h-4/5 shadow-xl mt-20 rounded-2xl bg-white border border-gray-200 overflow-hidden sidebar
        [&_span]:!text-[var(--main-internal-color)]
        [&_svg]:!text-[var(--main-internal-color)]
        [&_a:hover,&_button:hover]:!bg-transparent
        [&_a:hover,&_button:hover,&_a:hover_*,&_button:hover_*]:!text-[var(--main-hover-color)]
        transition-all duration-300
        ${
          isOpen
            ? "max-lg:fixed max-lg:left-4 max-lg:top-20 max-lg:z-50 max-lg:translate-x-0"
            : "max-lg:hidden max-lg:-translate-x-full"
        }
        lg:block lg:translate-x-0`}
      >
        {/* Close Button */}
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden absolute top-3 right-3 p-1 rounded-md hover:bg-gray-100 z-50"
          >
            <HiX className="w-5 h-5 text-black" />
          </button>
        )}

        <Sidebar
          aria-label="App sidebar"
          className="w-full h-full [&>div]:bg-white [&>div]:border-none"
        >
          <SidebarItems>
            <SidebarItemGroup>
              <SidebarItem
                href="#"
                icon={HiChartPie}
                className="my-5"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </SidebarItem>

              {/* History */}
              <SidebarItem
                icon={HiViewBoards}
                // label="Pro"
                // labelColor="dark"
                className="my-5"
                onClick={() => {
                  setIsOpen(false);
                  if (userToken) {
                    navigate("/history");
                  } else {
                    setOpenModal(true);
                  }
                }}
              >
                History
              </SidebarItem>

              <SidebarItem
                href="#"
                icon={HiInbox}
                // label="3"
                className="my-5"
              >
                Inbox
              </SidebarItem>
              
              
              

              <SidebarCollapse
                icon={HiUser}
                label="Users"
                className="my-5"
              >
                <SidebarItem href="#" onClick={()=> navigate("/updatedata")}>Update User Data</SidebarItem>
                <SidebarItem href="#" onClick={()=> navigate("/updatepassword")}>Update Password</SidebarItem>
              </SidebarCollapse>

              {/* Logout */}
              {userToken && (
                <SidebarItem
                  href="#"
                  icon={HiArrowSmRight}
                  onClick={LogOut}
                  className="my-5"
                >
                  Log out
                </SidebarItem>
              )}
            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>
      </div>

      
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        size="md"
      >
        <div className="p-6 text-center">
          <HiExclamationCircle className="mx-auto mb-4 h-14 w-14 text-[var(--main-internal-color)]" />

          <h3 className="mb-3 text-xl font-semibold text-[var(--main-internal-color)]">
            لازم تسجل دخول الأول
          </h3>

          <p className="mb-5 text-gray-500 text-lg">
            عشان تشوف الـ history بتاعتك
          </p>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                setOpenModal(false);
                navigate("/login");
              }}
              className="bg-[var(--main-internal-color)] text-white px-4 py-2 rounded-lg text-lg"
            >
              Login
            </button>

            <button
              onClick={() => setOpenModal(false)}
              className="bg-gray-200 px-4 py-2 rounded-lg text-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AppSidebar;
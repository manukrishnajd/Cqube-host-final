import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import avatar from "../Data/avatar.jpg";
import { Cart, Chat, Notification, UserProfile } from ".";
import { useStateContext } from "../Contexts/ContextProvider";
import { FaCodeBranch } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { useState } from "react";
import AdminViewSupport from "../Pages/AdminViewSupport";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color: "white" }}
      className="relative text-2xl rounded-full p-3 hover:bg-orange-400"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = (props) => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const [isSupportOpen, setIsSupportOpen] = useState(false);

  const openSupport = () => {
    setIsSupportOpen(!isSupportOpen);
  };


  
  return (
    <div className="flex rounded-r-full   bg-slate-600 h-fit w-full z-50 justify-between p-2 relative">
      
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={"currentColor"}
        icon={<AiOutlineMenu />}
      />
      <button
          onClick={openSupport}
  
          className="focus:outline-none"
        >
          <BiSupport className='pr-5 bg ' size={50} />
        </button>

        {isSupportOpen && <AdminViewSupport />}

      <div className="flex">
        {/* <NavButton
          title="Add branch"
          dotColor="#03C9D7"
          customFunc={() => handleClick("chat")}
          color={currentColor}
          icon={<FaCodeBranch />}
        /> */}
        <NavButton
          title="Notification"
          dotColor="rgb(254, 201, 15)"
          customFunc={() => handleClick("notification")}
          color={currentColor}
          icon={<RiNotification3Line />}
        />
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-orange-400 rounded-full"
            onClick={() => handleClick("userProfile")}
          >
            <div className="relative inline-block">
              <img
                className="rounded-full w-12 h-12"
                src={avatar}
                alt="user-profile"
              />
              <div className="absolute inset-0 border-white border-1 rounded-full hover:animate-ping"></div>
            </div>

            <p>
              <span className="text-white text-14">Welcome!</span>{" "}
              <span className="text-white font-bold ml-1 text-14">{props.user}</span>
            </p>
            <MdKeyboardArrowDown className="text-white text-14" />
          </div>
        </TooltipComponent>

      
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;

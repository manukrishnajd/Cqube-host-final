import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import avatar from "../../../src/Data/avatar.jpg";

import { useStateContext } from "../../Contexts/ContextProvider";
import StudentUserProfile from "../../../src/Components/Student/StudentUserProfile";
import StudentNotification from "./StudentNotification";



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

const StudentNavbar = (props) => {
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

  return (

    

    <div className="flex bg-slate-800 h-fit w-full z-50 justify-between p-2 relative rounded-r-full">


      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
       
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

   
      
        {isClicked.notification && <StudentNotification />}
        {isClicked.userProfile && <StudentUserProfile/>}
      </div>
    </div>
  );
};

export default StudentNavbar;

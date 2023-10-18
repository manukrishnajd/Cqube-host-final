import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../Contexts/ContextProvider";
import logo from "../../src/logo.png";

const Sidebar = ({ sidebarData }) => {
  const { activeMenu, setActiveMenu, screenSize, currentColor } =
    useStateContext();

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const toggleSidebar = () => {
    setActiveMenu(!activeMenu);
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className={`w-80 h-90px bg-white shadow-lg  pb-10 ${activeMenu ? "" : "hidden"}`}>
      <div className="flex justify-between items-center">
        <Link
          to="/"
          onClick={handleCloseSidebar}
          className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
        >
          <img src={logo} width="100px" className="m-auto" alt="" />
        </Link>
        <TooltipComponent content="Menu" position="BottomCenter">
          <button
            type="button"
            onClick={toggleSidebar}
            className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
          >
            {activeMenu ? <MdOutlineCancel /> : <FaBars />}
          </button>
        </TooltipComponent>
      </div>
      <div className="mt-10">
        {sidebarData.map((item, index) => (
          <div key={index}>
            {/* Render each item */}
            <NavLink
              to={`/${item.link}`}
              onClick={handleCloseSidebar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              {item.icon}
              {screenSize > 900 && <span className="capitalize">{item.name}</span>}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

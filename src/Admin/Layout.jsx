import React, { useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import { Navbar } from '../Components';
import { Outlet } from 'react-router-dom';
import {
  MdHome,
  MdBook,
} from 'react-icons/md';
import { GiAbstract021, GiBranchArrow, GiTeacher } from 'react-icons/gi';
import { FaCodeBranch, FaUserGraduate } from 'react-icons/fa';
import { IoIosHome } from 'react-icons/io';
import Footer from '../Components/dashboard component/Footer';
import { GrAddCircle } from 'react-icons/gr';
import { BiTask } from 'react-icons/bi';
import { useTokenVerification } from '../service/trainerService';


const Layout = () => {
 
  useTokenVerification()

  const sidebarData = [
    {
      name: "Home",
      link: "admin/dash",
      icon: <IoIosHome style={{width:"30px"  ,height:"30px" }} />,
    },
    {
      name: "Course",
      link: "admin/course",
      icon: <MdBook style={{width:"30px"  ,height:"30px" }}  />,
    },
    {
      name: "Activity",
      link: "admin/task",
      icon: <BiTask style={{width:"30px"  ,height:"30px" }}  />,
    },
    {
      name: "Add Activity",
      link: "admin/AddActivity",
      icon: <GrAddCircle style={{width:"30px"  ,height:"30px" }}  />,
    },
    {
      name: "Sub Course",
      link: "admin/subcourse",
      icon: <MdBook style={{width:"30px"  ,height:"30px" }}  />,
    },
    {
      name: "Student",
      link: "admin/student",
      icon: <FaUserGraduate style={{width:"30px"  ,height:"30px" }}  />,
    },
    {
      name: "Trainer",
      link: "admin/trainers",
      icon: <GiTeacher style={{width:"30px"  ,height:"30px" }} />,
    },
    {
      name: "Reports",
      link: "admin/reports",
      icon: <MdBook style={{width:"30px"  ,height:"30px" }} />,
    },
    {

      name: "Branch",
      link: "admin/branch",
      icon: <GiBranchArrow style={{width:"30px"  ,height:"30px" }} />,
    },
    {

      name: "Notification",
      link: "admin/notification",
      icon: <GrAddCircle style={{width:"30px"  ,height:"30px" }} />,
    },
  ];

  








  return (
    <>
    <div className='flex'>
      <Sidebar sidebarData={sidebarData} />
      <div className='flex flex-col w-screen'>
        <Navbar />
        <div className='p-10 overflow-y-scroll height'>

        <Outlet />
        </div>
        <div className='flex-grow p-3'>
          {/* Content for the main section of the layout */}
        </div>
      </div>
    </div>
        <Footer/>
      </>
  );
};

export default Layout;

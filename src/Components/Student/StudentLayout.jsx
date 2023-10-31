import React from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import Task from "./Task";
import  Pie  from "../../Pages";
import {BiTask} from 'react-icons/bi'
import {FiUserCheck} from 'react-icons/fi'
import { Sparkline } from "@syncfusion/ej2-react-charts";
import {AiTwotoneHome} from 'react-icons/ai'
import {RiNotification2Fill} from 'react-icons/ri'
import {SiCoursera} from 'react-icons/si'
import SparkLine from "../Charts/SparkLine";
import Stacked from "../Charts/Stacked";
import LineChart from "../Charts/LineChart";
import SubmitForm from "./SubmitForm";
import StudentNavbar from "./StudentNavbar";
import StudentDash from "./StudentDash";
import { useTokenVerification } from "./apiServices";




const  StudentLayout = () => {

useTokenVerification()

  const sidebarData = [
    {
      name: "Home",
      icon: <AiTwotoneHome/>,
      link:"student/dash"
    },
    {
      name: "Attendence",
      icon: <FiUserCheck/>,
      link:"student/attendence"
    },
    {
      name: "Task",
      icon: <BiTask/>,
      link:"student/task"
    },
    {
      name: "Course",
      icon: <SiCoursera/>,
      link:'student/course'
    },
  
    // Add more objects as needed
  ];
  return (
    <div className='flex'>
      <Sidebar sidebarData={sidebarData} />
      <div className='flex flex-col w-screen'>
        <StudentNavbar />
        <div className='p-5 overflow-y-scroll height'>

        <Outlet />
       
        
        </div>
        <div className='flex-grow p-3'>
         
          
        </div>
      </div>
    </div>
  );
};

export default StudentLayout;

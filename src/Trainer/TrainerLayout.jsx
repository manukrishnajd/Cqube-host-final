import React from 'react';
import { Outlet } from 'react-router-dom';
import {BsFillPersonLinesFill} from 'react-icons/bs'
import {FaTasks} from 'react-icons/fa'
import {BiSolidBookReader} from 'react-icons/bi'

import {Sidebar } from '../Components';
import { MdBook, MdHome } from 'react-icons/md';
import TrainerNavbar from './TrainerNavbar';
import { useTokenVerification } from '../service/trainerService';


const TrainerLayout = () => {

useTokenVerification()


  const sidebarData = [
    // {
    //   name: "Home",
    //   link: "trainer/dash",
    //   icon: <MdHome />,
    // },
    {
      name: "Activity",
      icon: <FaTasks size={20}/>,
      link:"trainer/activity"
    },
    {
      name: "Student",
      icon: <BsFillPersonLinesFill size={20}/>,
      link:"trainer/student"
    },
    {
      name: "Course",
      icon: <MdBook size={20}  />,
      link:"trainer/course"
    },
    
    // Add more objects as needed
  ];
  return (
    <div className='flex '>
    <Sidebar sidebarData={sidebarData} />
    <div className='flex flex-col w-screen'>
      <TrainerNavbar />
      <div className=' p-3 overflow-y-scroll  height '>

      <Outlet />
      </div>
      <div className='flex-grow p-3'>
        {/* Content for the main section of the layout */}
      </div>
    </div>
  </div>
  );
};

export default TrainerLayout;

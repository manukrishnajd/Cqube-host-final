import React, { useState ,useEffect} from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import Button from '../Button';
import { userProfileData } from '../../Data/dummy';
import { useStateContext } from "../../Contexts/ContextProvider";
import avatar from "../../../src/Data/avatar.jpg";
import { HiOutlineSortAscending } from 'react-icons/hi';
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';
import {studentbyid} from './apiServices'

const StudentUserProfile = () => {
  const { currentColor } = useStateContext();
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate(); // Hook to navigate to different routes


  const stdid = localStorage.getItem("id");
  const [studentName, setStudentName] = useState(null); // Initialize studentData state

  useEffect((stdid) => {
    // Fetch student data and update the state
    studentbyid(stdid) // Replace 'your_token_here' with an actual token
      .then(data => {
        setStudentName(data.name);
      })
      .catch(error => {
        console.error("Failed to fetch student data: " + error.message);
      });
  }, [stdid]);


  const toggleProfile = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    navigate('/login'); // Navigate to the login page
  };

 

  return (
    <div
      className={`nav-item absolute right-1 ${
        isOpen ? 'top-16 slide-in' : 'slide-out'
      } bg-white dark-bg p-8 rounded-lg w-96`}
    >
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark-text">User Profile</p>
        <Button
          icon={<HiOutlineSortAscending />}
          color="orange"
          size="2xl"
          borderRadius="50%"
          onClick={toggleProfile}
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img className="rounded-full h-24 w-24" src={avatar} alt="user-profile" />
        <div>
          <p className="font-semibold text-xl dark-text">{studentName}</p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <Link to='/student/profile'>
          <div
            key={index}
            className="flex gap-5 border-b-1 border-color p-4 hover-bg cursor-pointer dark-hover-bg"
          >
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className="text-xl rounded-lg p-3 hover-bg"
              
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark-text">{item.title}</p>
              <p className="text-gray-500 text-sm dark-text"> {item.desc} </p>
            </div>
          </div>
        </Link>
        ))}
      </div>
      <div className="mt-5">
        <a href="/login" className="text-orange-400">
          <AiOutlineLogout style={{ fontSize: '30px' }} />
        </a>
      </div>
    </div>
    );
};

export default StudentUserProfile;

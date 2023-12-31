import React, { useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { Button } from '.';
import { userProfileData } from '../Data/dummy';
import { useStateContext } from '../Contexts/ContextProvider';
import avatar from '../Data/avatar.jpg';
import { HiOutlineSortAscending } from 'react-icons/hi';
import './UserProfile.css'; // Import the CSS file for animations
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';

const UserProfile = () => {
  const { currentColor } = useStateContext();
  const [isOpen, setIsOpen] = useState(true);
  const navigate =useNavigate();

  const toggleProfile = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/adminlogin'); // Navigate to the login page
  };
  return (
    <div
      className={`nav-item absolute right-1 ${
        isOpen ? 'top-16 slide-in' : 'slide-out'
      } bg-white dark:bg-[#42464D] p-8 rounded-lg w-96`}
    >
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
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
          <p className="font-semibold text-xl dark:text-gray-200"> Admin </p>
          <p className="text-gray-500 text-sm dark:text-gray-400"> Administrator </p>
        </div>
      </div>
      <div>
     
      </div>
      <div className="mt-5">

    <AiOutlineLogout onClick={handleLogout} style={{ fontSize: '30px' }} />

</div>

    </div>
  );
};

export default UserProfile;

import React, { useEffect, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import Button from '../Button';
import { chatData } from '../../../src/Data/dummy';
import { useStateContext } from "../../Contexts/ContextProvider";
import { notificationbyId } from './apiServices';

const StudentNotification = () => {

  const[notification,setNotification]=useState(null)
  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjdkMzNlMGJiMzkyNzJiNTIwNTk1NiIsImlzU3R1ZGVudCI6dHJ1ZSwiaWF0IjoxNjk3MTA5NDc4fQ.vFyw7Uwu36a2efC4Yi2FASuupQOqqmRRrWb0ONHFxF0";
 


  useEffect(() => {
    // Fetch student data and update the state
    notificationbyId({token}) // Replace 'your_token_here' with an actual token
      .then(data => {
        setNotification(data);
      })
      .catch(error => {
        console.error("Failed to fetch student data: " + error.message);
      });
  }, []);



   

  const { currentColor, close, setClose} = useStateContext();

  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">Notifications</p>
          <button type="button" className="text-white text-xs rounded p-1 px-2 bg-orange-theme "> 5 New</button>
        </div>
        <Button icon={<MdOutlineCancel />} color="rgb(153, 171, 180)" bgHoverColor="light-gray" size="2xl" borderRadius="50%"/>
      </div>
      <div className="mt-5 ">
        {notification?.map((item, index) => {
         return(
          <div key={index} className="flex items-center leading-8 gap-5 border-b-1 border-color p-3">
          <div>
            <p className="font-semibold dark:text-gray-200">{item.message}</p>
            <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
          </div>
        </div>
         )
         })}
        <div className="mt-5">
          <Button color="white" bgColor={currentColor} text="See all notifications" borderRadius="10px" width="full" />
        </div>
      </div>
    </div>
  );
};

export default StudentNotification;
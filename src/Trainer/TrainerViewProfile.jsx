// StudentProfile.js

import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { trainerdetail } from "../service/trainerService";
import { useState } from "react";

const TrainerViewProfile = () => {

  // Replace this with your logic to fetch the student details based on the ID
  // For now, we'll display a simple message
const [trainerdata,settrainer]=useState()

const id=localStorage.getItem('id')
useEffect(async()=>{
    let res=await trainerdetail(id)
    console.log(res);
    settrainer(res)

},[])

  return (
    <div className="container mx-auto p-10rounded-3xl">
      <h1 className="text-2xl text-center font-bold mb-4">My Profile</h1>
      <div className="flex justify-between w-fit gap-11 m-auto bg-white shadow-xl rounded-xl p-10">
        <img className="m-auto" src={trainerdata?.profilePic} width={200} height={200}  alt="" />
       <div >
        <h2 className="text-xl font-bold mb-2">{trainerdata?.name}</h2>
        <p>{trainerdata?.phoneNumber}</p>
        <p>{trainerdata?.email}</p>
        <p>Git - {trainerdata?.git}</p>
        <p>LinkedIn: {trainerdata?.linkedIn}</p>
        <p>{trainerdata?.BranchName} Branch</p>
        <p>Course: {trainerdata?.selectedCourse}</p>
        </div>
      </div>
    </div>
  );
};

export default TrainerViewProfile;

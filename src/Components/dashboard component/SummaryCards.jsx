import React from 'react';
import './PresentAbsent.css';  // Import the CSS for styling
import { GiBlood } from 'react-icons/gi';
import { HiOutlineCode } from 'react-icons/hi';
import { BiArrowFromLeft } from 'react-icons/bi';


const SummaryCards = () => {
  // Replace these with actual data from your application
  const totalStudents = 100;
  const totalTrainers = 20;
  const totalCourses = 50;

  return (
    <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
      {/* Student Summary Card */}
     
      
      <div className="card">
        <h3 className=" text-sm font-semibold text-white mb-2">Total Students</h3>
        <p className="text-2xl font-bold text-orange-400">{totalStudents}</p>
      </div>

      {/* Trainer Summary Card */}
      <div className="card">

        <h3 className="text-sm font-semibold text-white mb-2">Total Trainers</h3>
        <p className="text-xl font-bold text-orange-400">{totalTrainers}</p>
      </div>

      {/* Course Summary Card */}
      <div className="card">

        <h3 className="text-sm font-semibold text-white mb-2">Total Courses</h3>
        <p className="text-xl font-bold text-orange-400">{totalCourses}</p>
      </div>
      <div>

        
      </div>
    </div>
  );
}

export default SummaryCards;

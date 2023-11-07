import React, { useEffect, useState } from "react";
import SummaryCards from "./dashboard component/SummaryCards";
import PresentAbsent from "./dashboard component/PresentAbsent";
import { GoPrimitiveDot } from "react-icons/go";
import StudentChart from "./dashboard component/StudentsChart";
import TrainerChart from "./dashboard component/TrainersChart";
import CoursesChart from "./dashboard component/CoursesChart";
import { useStateContext } from "../Contexts/ContextProvider";
import Pie from "../Pages/Charts/StudentCourseChart";
import { studentCountbyCourse } from "../service/apiService";
import { errorToastify } from "./Student/toastify";

const AdminDash = () => {
  const { } = useStateContext();
  const studentData = [
    { month: "Jan", count: 200 },
    { month: "Feb", count: 250 },
    { month: "Mar", count: 300 },
    { month: "Apr", count: 280 },
    { month: "May", count: 270 },
    { month: "Jun", count: 290 },
    { month: "Jul", count: 310 },
    { month: "Aug", count: 320 },
    { month: "Sep", count: 340 },
    { month: "Oct", count: 360 },
    { month: "Nov", count: 380 },
    { month: "Dec", count: 400 },
  ];

  const trainerData = [
    { month: "Jan", count: 50 },
    { month: "Feb", count: 60 },
    { month: "Mar", count: 70 },
    { month: "Apr", count: 65 },
    { month: "May", count: 55 },
    { month: "Jun", count: 75 },
    { month: "Jul", count: 80 },
    { month: "Aug", count: 85 },
    { month: "Sep", count: 90 },
    { month: "Oct", count: 95 },
    { month: "Nov", count: 100 },
    { month: "Dec", count: 110 },
  ];

  const coursesData = [
    { month: "Jan", count: 100 },
    { month: "Feb", count: 120 },
    { month: "Mar", count: 130 },
    { month: "Apr", count: 140 },
    { month: "May", count: 150 },
    { month: "Jun", count: 160 },
    { month: "Jul", count: 170 },
    { month: "Aug", count: 180 },
    { month: "Sep", count: 190 },
    { month: "Oct", count: 200 },
    { month: "Nov", count: 210 },
    { month: "Dec", count: 220 },
  ];

  

  return (
    <div className=" gap-1 flex-wrap justify-center  grid grid-cols-1">
      <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-700">
        <div className="flex justify-between">
          <p className="font-semibold  text-white text-xl">
            Empowering the IT Leaders of Tomorrow: Explore Our Students,
            Courses, and Trainers
          </p>
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
              <span>
                <GoPrimitiveDot />
              </span>
            </p>
            <p className="flex items-center gap-2 text-orange-400 hover:drop-shadow-xl">
              <span>
                <GoPrimitiveDot />
              </span>
            </p>
          </div>
        </div>

        <div className=" grid grid-cols-1">
          <div className=" grid grid-cols-3">
            <TrainerChart width="300px" height="300px" data={trainerData} />
            <CoursesChart width="300px" height="300px" data={coursesData} />
            <StudentChart width="300px" height="300px" data={studentData} />
          </div>
          <div className=" grid grid-cols-3 gap-10">
            <SummaryCards />
            <Pie/>
            {/* <PresentAbsent /> */}
          </div>

          <div></div>
        </div>
      </div>
   
      
    </div>
  );
};

export default AdminDash;

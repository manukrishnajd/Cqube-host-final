import React, { useEffect, useState } from "react";
import SummaryCards from "./dashboard component/SummaryCards";
import PresentAbsent from "./dashboard component/PresentAbsent";
import { GoPrimitiveDot } from "react-icons/go";
import StudentChart from "./dashboard component/StudentsChart";
import TrainerChart from "./dashboard component/TrainersChart";
import CoursesChart from "./dashboard component/CoursesChart";
import { useStateContext } from "../Contexts/ContextProvider";
import Pie from "../Pages/Charts/StudentCourseChart";
import { getgraphdata, studentCountbyCourse } from "../service/apiService";
import { errorToastify } from "./Student/toastify";

const AdminDash = () => {
  const { } = useStateContext();

  const [data,setdata]=useState()
  const [studentData,setStudentData]=useState()
  const [trainerData,setTrainerData]=useState()

useEffect(()=>{
  getgraphdata().then((res)=>{
    console.log(res);
    setdata(res)
  })
},[])

useEffect(() => {
  if (data) {
    const updatedStudentData = data.map((item) => ({
      month: item.month,
      count: item.students.length // Get the number of students for each month
    }));

    const updatetrainerData=data.map((item)=>({
      month: item.month,
      count: item.trainers.length
    }))

    setStudentData(updatedStudentData);
    setTrainerData(updatetrainerData);
  }
}, [data]);

console.log(studentData,'sj');
 



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
          <div className=" flex justify-center">
            <TrainerChart width="300px" height="300px" data={trainerData} />
            {/* <CoursesChart width="300px" height="300px" data={coursesData} /> */}
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

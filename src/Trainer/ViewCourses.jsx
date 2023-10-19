import { Card, Typography } from "@material-tailwind/react";
import Students from "./View_student";
import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import Course, { coursebyid, studentbycourse, trainerdetail } from "../service/trainerService";
 
const TABLE_HEAD = ["Name", "Job", "Employed", ""];



const id = localStorage.getItem('id');
console.log(id);
 
const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];
 
export function ViewCourses() {
  
  const [data,setdata]=useState([])
 
useEffect(()=>{
  trainerdetail(id).then((res)=>{
    console.log(res,'responsekjn');
    setdata(res.courseRef)
  })
},[])

console.log(data,'datas');

  const [stud, setstud]=useState(false)

  const student=(courseid,id)=>{
    console.log(courseid,id,'bhjnk');
    studentbycourse(courseid,id)
    setstud(!stud)
  }
  return (
    <>
    <div className="flex gap-4 flex-wrap">
      {data.map((item)=>{
        return(
          <>
          <h3>{item._id}hbjnkm</h3>
          <CourseCard course={item.name} description={item.details} syllabus={item.syllabus  } st={() => student(item._id,id)} />
          </>
          )
      })}
   {/* <CourseCard course="DSA" description="DSA Description" st={student}/> */}
    </div>
  {stud &&
  <Students/>
  }

  </>
  );
}
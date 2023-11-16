import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import { studentbyid } from "./apiServices";
import student from "./student.png";
import {useTokenVerification} from './apiServices'

export default function CourseCard() {
  const token =
    "your_token_here"; // Replace with your actual token

  const stdid = localStorage.getItem("id");
  const [studentData, setStudentData] = useState(null);
  const [activeTab, setActiveTab] = useState("ongoing");

  useEffect(() => {
    studentbyid(stdid, { token })
      .then((data) => {
        setStudentData(data.courses);
      })  
      .catch((error) => {
        console.error("Failed to fetch student data: " + error.message);
      });
  }, [stdid]);

  useTokenVerification()

  

  const ongoingCourses = studentData?.filter((course) => !course.isCompleted) || [];
  const completedCourses = studentData?.filter((course) => course.isCompleted) || [];

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <h1
        className="text-5xl bg-slate-500 h-20 text-white  p-3 rounded "
        style={{ fontFamily: "cursive" }}
      >
        Courses{" "}
        <img className="w-16 h-16 relative left-44 bottom-14" src={student} alt="" />
      </h1>

      <div>
        <div className="text-3xl text-purple-700 mt-20 mb-7 flex items-center">
          <button
            onClick={() => setActiveTab("ongoing")}
            className={`${
              activeTab === "ongoing" ? "bg-purple-700 text-white" : "bg-gray-300 text-gray-700"
            } p-2 rounded-l-md`}
          >
            Ongoing
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`${
              activeTab === "completed" ? "bg-purple-700 text-white" : "bg-gray-300 text-gray-700"
            } p-2 rounded-r-md`}
          >
            Completed
          </button>
        </div>
        
          {activeTab === "ongoing" &&
            ongoingCourses.map((course, index) => (
              <Card key={index} sx={{ maxWidth: 345 }} className="mt-12 shadow-inner shadow-zinc-500">
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {course.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.trainerName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.details}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    style={{ backgroundColor: "orange", color: "white" }}
                    onClick={() => window.open(course.syllabus, "_blank")}
                  >
                    Syllabus
                  </Button>
                </CardActions>
              </Card>
            ))}
          {activeTab === "completed" &&
            completedCourses.map((course, index) => (
              <Card key={index} sx={{ maxWidth: 345 }} className="mt-12 shadow-inner shadow-zinc-500">
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {course.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.trainerName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.details}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    style={{ backgroundColor: "orange", color: "white" }}
                    onClick={() => window.open(course.syllabus, "_blank")}
                  >
                    Syllabus
                  </Button>
                </CardActions>
              </Card>
            ))}
       
      </div>
    </div>
  );
}


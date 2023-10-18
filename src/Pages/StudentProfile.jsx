// StudentProfile.js

import React from "react";
import { useParams } from "react-router-dom";

const StudentProfile = () => {
  const { id } = useParams(); // Get the student ID from the URL parameter

  // Replace this with your logic to fetch the student details based on the ID
  // For now, we'll display a simple message
  const studentDetails = {
    name: "John Doe",
    phone: "1234567890",
    email: "john.doe@example.com",
    git: "johndoe",
    linkedIn: "linkedin.com/in/johndoe",
    selectedTrainer: "Trainer 1",
    selectedBranch: "Branch 1",
    selectedCourse: "Course 1",
  };

  return (
    <div className="container mx-auto p-10 bg-white rounded-3xl">
      <h1 className="text-2xl font-bold mb-4">Student Profile</h1>
      <div>
        <h2 className="text-xl font-bold mb-2">{studentDetails.name}</h2>
        <p>Phone: {studentDetails.phone}</p>
        <p>Email: {studentDetails.email}</p>
        <p>Git: {studentDetails.git}</p>
        <p>LinkedIn: {studentDetails.linkedIn}</p>
        <p>Trainer: {studentDetails.selectedTrainer}</p>
        <p>Branch: {studentDetails.selectedBranch}</p>
        <p>Course: {studentDetails.selectedCourse}</p>
      </div>
    </div>
  );
};

export default StudentProfile;

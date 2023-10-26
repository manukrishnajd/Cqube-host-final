import { useState } from "react";
import axios from "axios";
import { errorToastify } from "../Components/Student/toastify";

const BASE_URL = "http://localhost:4000/api/";

const API_ROUTES = {
  STUDENTS: "student",
  STUDENTS_Register: "student/register",
  COURSES: "course",
  SUBCOURSES: "subcourse",
  BRANCHES: "branch",
  NOTIFICATIONS: "notification",
  AUTH: "auth",
  TRAINER: "trainer",
  LOGIN: "adminlogin",
};

const buildUrl = (route) => `${BASE_URL}${route}`;



  const token = localStorage.getItem("token")



// login section
export const loginAdmin = async (email, password) => {
  try {
    const response = await axios.post(`http://localhost:4000/api/auth/login`, email,  password );
    localStorage.setItem("token", response?.data?.token);
    localStorage.setItem("id", response?.data?.otherDetails?._id);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};






//  create branch
export const createBranch = async (name) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/branch",
      {name},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
// view all branchs
export const getAllBranches = async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/branch");
    return response.data.result;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
// delete branch
export const deleteBranch = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:4000/api/branch/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

//branch api end





export const viewbranch = async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/branch", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to add student: " + error.message);
  }
};



// ------------------------


//studennt

export const addStudent = async (studentData) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/student/register",
      studentData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.authorization);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add student: " + error.message);
  }
};

//student get
export const getStudent = async () => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/student`
    );
    console.log(response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add student: " + error.message);
  }
};

//update student

export const updateStudentById = async (studentId, updatedStudentData) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/api/student/${studentId}`,
      updatedStudentData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update student: " + error.message);
  }
};


export const deleteStudentById = async (studentId) => {
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/student/${studentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete student: " + error.message);
  }
};



//----------------------counts
export const getCountOfSubCourse = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/counts/subcoursecount",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response", response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
    }
};

//----------------------counts
export const getCountOfstudent = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/counts/studentcount",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response", response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
    }
};


//----------------------counts
export const getCountOftrainer = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/counts/trainercount",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response", response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
    }
};

//student count by course
export const studentCountbyCourse = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/counts/piecoursecount",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response", response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
    }
};







// ```````````````````````````````````````````````````````````````````````````````

//Course
// ```````````````````````````````````````````````````````````````````````````````
export const getCourse = async () => { // getAllCourses
  try {
    const response = await axios.get(
      "http://localhost:4000/api/course?ismaincourse=true",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response", response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
    }
};
export const getSubcourse = async () => { // getAllCourses
  try {
    const response = await axios.get(
      "http://localhost:4000/api/course?ismaincourse=false",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response", response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
    }
};



//add course
export const addcourse = async (newCourse) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/course",
      newCourse,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to add student: " + error.response.data.message);
  }
};
//add course
export const addSubcourse = async ({name},id) => {
  console.log(name,id,'inside api');
  try {
    const response = await axios.post(
      `http://localhost:4000/api/subcourse/${id}`,
      {name:name},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to add student: " + error.response.data.message);
  }
};
export const deleteSubcourse = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/subcourse/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to delete course: " + error.response.data.message);
  }
};



// Function to update a course by ID
export const updateCourse = async (courseId, courseData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}course/${courseId}`,
      courseData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update course: " + error.message);
  }
};

// Function to delete a course by ID
export const deleteCourse = async (courseId) => {
  try {
    const response = await axios.delete(`${BASE_URL}course/${courseId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete course: " + error.response.data.message);
  }
};

//subcourse get

export const getSubCourse = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/course?ismaincourse=false",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response", response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
    }
};



//Trainer

export const addTrainer = async (trainerData) => {
  try {
    const response = await axios.post(
      `http://localhost:4000/api/trainer/register/`,
      trainerData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // return response.data;
    console.log(response.data);
  } catch (error) {
    throw new Error("Failed to get branch: " + error.message);
  }
};
export const getAllTrainers = async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/trainer", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response", response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add student: " + error.message);
  }
};
export const updateTrainer = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/api/trainer`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response", response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add student: " + error.message);
  }
};

//Branch

export const addbranch = async (branch) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/branch",
      branch,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to add student: " + error.message);
  }
};



//view all branches
export const getBranch = async (pageNo) => {
  try {
    const response = await axios.get(`http://localhost:4000/api/branch?page=${pageNo}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get branch: " + error.message);
  }
};




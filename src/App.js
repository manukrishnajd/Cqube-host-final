import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import Login from "./auth/Login";
import "./App.css";
import Layout from "./Admin/Layout";
import TrainerDash from "./Components/AdminDashboardd";
import TrainerLogin from "./Trainer/TrainerLogin";


import StudentDash from './Components/Student/StudentDash'
import CourseCard from './Components/Student/CourseCard'
import StudentForgetPass from './auth/forget'
import StudentViewpage from './Components/Student/StudentViewpage'
import AttendenceCard from './Components/Student/AttendenceCard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



import StudentProfile from './Components/Student/StudentProfile'

import Students from './Pages/Students'

import { Calendar, Courses, Kanban, Pie, ViewPage } from './Pages'

import StudentLayout from './Components/Student/StudentLayout'

import TrainerLayout from '../src/Trainer/TrainerLayout'
import StudentTable from './Trainer/View_student'
import TrainerTask from './Trainer/Task'
import TrainerDashboard from './Trainer/TrainerDash'
import Trainers from "./Pages/Trainers";
import Studentdetail from "./Trainer/Student_detail";
import NotFound from "./Components/NotFound";
import AdminReportsPage from "./Pages/Report";
import NodeTree from "./common/NodeTree";

import { ViewCourses } from "./Trainer/ViewCourses";


import './App.css'
import AdminDash from "./Components/AdminDashboardd";
import Branch from "./Pages/Branch";
import Subcourse from "./Pages/Subcourse";
import SubmitForm from "./Components/Student/SubmitForm";
import Task from "./Components/Student/Task";


// admin login
import AdminLogin from "./auth/AdminLogin";
import AdminTask from "./Pages/AdminTask";
import AdminAddActivity from "./Pages/Add_Activity";
import ResetPassword from "./auth/ResetPassword";
import StudentUserProfile from "./Components/Student/StudentUserProfile";





const App = () => {
  return (
    <div>
      <BrowserRouter>
      <ToastContainer />
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path='/forgetpass' element={<StudentForgetPass/>}/>
          <Route path='ResetPassword' element={<ResetPassword/>}/>
          <Route path="adminlogin" element={<AdminLogin />} />

          <Route path="*" element={<NotFound />} />
          {/* Admin routes */}
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin" element={<Layout />}>
            <Route path="dash" element={<AdminDash />} />
            <Route path="subcourse" element={<Subcourse />} />
            <Route path="task" element={<AdminTask />} />
            <Route path="AddActivity" element={<AdminAddActivity />} />
           
            <Route path="studentview" element={<StudentProfile/>} />
            <Route path="student" element={<Students />} />
            <Route path="student/viewpage" element={<ViewPage/>} />
            <Route path="trainers" element={<Trainers />} />
            <Route path="course" element={<Courses />} />
            <Route path="reports" element={<AdminReportsPage/>} />
            <Route path="tree" element={<NodeTree />} />
            <Route path="branch" element={<Branch />} />
            <Route path="viewpage" element={<ViewPage/>} />
          </Route>
          {/* trainer */}
          <Route path="/trainer" element={<TrainerLayout />}>
            <Route path="student" element={<StudentTable />} />
            <Route path="detail/:studentid" element={<Studentdetail />} />
            <Route path="activity" element={<TrainerTask />} />
            <Route path="course" element={<ViewCourses />} />
          </Route>
          {/* student */}
        {/* trainer */}
        <Route path='/trainerlogin' element={<TrainerLogin/>}/>
        <Route path='/trainer' element={<TrainerLayout/>}>
            <Route path='student' element={<StudentTable/>}/>
            <Route path='detail' element={<Studentdetail/>}/>
            <Route path='activity' element={<TrainerTask/>}/>
            <Route path='dash' element={<TrainerDashboard/>}/>
        </Route>


        {/* student */}

        <Route path='/student' element={<StudentLayout/>}>
            <Route path ='dash' element={<StudentDash/>}/>
            <Route path='task' element={<Task/>}/>
            <Route path='attendence' element={<AttendenceCard/>}/>
            <Route path='upcomingTask' element={<SubmitForm/>}/>
            <Route path='submitform/:id' element={<SubmitForm/>}/>
            <Route path='course' element={<CourseCard/>}/>
            <Route path='profile' element={<StudentProfile/>}/>
            <Route path='Scorecard' element={<StudentViewpage/>}/>
           


            

           

        </Route>

      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

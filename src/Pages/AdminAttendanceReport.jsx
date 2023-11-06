import React, { useEffect, useState } from "react";
import { ChartsHeader, Pie as PieChart } from "../Components";
import { AiFillCheckCircle } from "react-icons/ai";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Modal from 'react-modal'

import {
  AttendenceByCountfilterAdmin,
  AttendenceByCountid,
  getActivitybyadmin,
  getStudentbyid,
  studentCountbyCourse,
} from "../service/apiService";
import { errorToastify } from "../Components/Student/toastify";

import Doughnut from "./AdminAttendencePie";
import { AttendenceByCountfilter } from "../Components/Student/apiServices";
import { useParams } from "react-router-dom";

const AdminAttendPie = () => {
  const { student_id } = useParams();
  console.log(student_id, "student id");

  const [stdatas, setstdatas] = useState();

  const [studentdata, setStudentData] = useState([]);
  const [studentcount, setCountStudent] = useState(0);
  const [count, setCount] = useState([]);
  const [startdate, setstartdate] = useState();
  const [enddate, setenddate] = useState();
  const [refresh, setrefresh] = useState(true);
  


  

 
  useEffect(() => {
    getCounts();
   
  }, []);
  
  console.log(stdatas?._id, "iuygvb");
  
  const [activData,setactivData]=useState([])
  const getCounts = async () => {
    try {
      let stdata = await getStudentbyid(student_id);
      setstdatas(stdata);
      if(stdata._id){

        const response = await AttendenceByCountid(stdata._id);
        
        console.log(response?.result, "resultss");
        setCountStudent(response?.result);
      
      }
      // Assuming response.result is an array of objects with properties course, value, and count.

      console.log(studentdata, "datas of student");
    
      let res= await  getActivitybyadmin(stdata._id)
      console.log(res,'klsjhkja');
      setactivData(res.result)
    } catch (error) {
      console.log(error, "error");
      // errorToastify(error?.message); 
    }
  };
  console.log(studentdata, "oiuytf");

console.log(activData,'iuytg');


  //date picker
  const handlestartdate = (e) => {
    setstartdate(e.target.value);
  };
  const handleenddate = (e) => {
    setenddate(e.target.value);
  };
  const submitDate = async (e) => {
    e.preventDefault();
    console.log("clicked");
    setstartdate(startdate);
    setenddate(enddate);
    if (startdate && enddate) {
      const filterresponse = await AttendenceByCountfilterAdmin(
        startdate,
        enddate,
        stdatas._id 
      );
      console.log(filterresponse, "cdfvgbhn");
      setCountStudent(filterresponse?.result);
      console.log(studentcount);
      
    }
  };
  const initialStudents = [
      {
        id: 1,
        topic: "Mern",
        Course: "23/04/2023",
        phoneNumber: "Task",
        branch: "Manu",
        email: "Completed",
        status: "9",
      },
      {
        id: 2,
        topic: "React",
        Course: "25/04/2023",
        phoneNumber: "Assignment",
        branch: "Alex",
        email: "In Progress",
        status: "5",
      },
      // Add more default student objects as needed
    ];

//table
const [students] = useState(initialStudents);
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const offset = currentPage * itemsPerPage;
    const currentStudents = activData.slice(offset, offset + itemsPerPage);
    const totalPages = Math.ceil(activData.length / itemsPerPage);
  
    const handlePageChange = (newPage) => {
      if (newPage >= 0 && newPage < totalPages) {
        setCurrentPage(newPage);
      }
    };


console.log(activData,'datas');


  return (
    <>
      <div className="flex items-center justify-center bg-white dark:bg-secondary-dark-bg rounded-3xl mt-8">
        <form onSubmit={submitDate} className="max-w-xs mx-auto mt-8 ">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="start-date"
            >
              Start Date
            </label>
            <input
              id="start-date"
              type="date"
              onChange={handlestartdate}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="end-date"
            >
              End Date
            </label>
            <input
              id="end-date"
              type="date"
              onChange={handleenddate}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex gap-3">
            <div className="text-center">
              <input
                type="submit"
                value="Check"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              />
            </div>
            
            {/* <div className="text-center">
              <button
                onClick={function () {
                  setrefresh(!refresh);
                }}
                className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Reset
              </button>
            </div> */}
          </div>
        </form>
        <div className="ms-0">

        <Doughnut
          id="chart-pie"
          data={studentcount}
          legendVisiblity
          height="full"
          />
          </div>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: '#475569',color:"white",fontSize:"17px" }}>Topic</TableCell>
              <TableCell style={{ backgroundColor: '#475569',color:"white",fontSize:"17px" }}>Due Date</TableCell>
              <TableCell style={{ backgroundColor: '#475569',color:"white",fontSize:"17px" }}>Type</TableCell>
              <TableCell style={{ backgroundColor: '#475569',color:"white",fontSize:"17px" }}>Evaluated by</TableCell>
              <TableCell style={{ backgroundColor: '#475569',color:"white",fontSize:"17px" }}>Status</TableCell>
              <TableCell style={{ backgroundColor: '#475569',color:"white",fontSize:"17px" }}>Mark</TableCell>
              <TableCell style={{ backgroundColor: '#475569',color:"white",fontSize:"17px" }}>Evaluate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentStudents.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{student.topic}</TableCell>
                <TableCell>{student.duedate}</TableCell>
                <TableCell>{student.notes}</TableCell>
                <TableCell>{student.branch}</TableCell>
                <TableCell>{student.status}</TableCell>
                <TableCell>{student.mark}</TableCell>
                <TableCell>
                  <AiFillCheckCircle size={20} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="pagination-container">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Previous
        </Button>
        <span className="page-number">Page {currentPage + 1} of {totalPages}</span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </Button>
      </div>

      <div className="page-numbers">
        {Array.from({ length: totalPages }, (_, i) => i).map((pageNumber) => (
          <Button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            disabled={pageNumber === currentPage}
          >
            {pageNumber + 1}
          </Button>
        ))}
      </div>
    </>
  );
};

export default AdminAttendPie;

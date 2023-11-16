import React, { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import ExcelJS from "exceljs";
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
import Modal from "react-modal";
import { Verified, activityadd, useTokenVerification, viewactivity, viewstudent } from "../../../src/service/trainerService";
import { useEffect } from "react";
import { errorToastify } from "../../../src/Components/Student/toastify";
import { table } from "@syncfusion/ej2-react-grids";
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from "react-icons/bs";
import { evaluateanswer, getcoursereports } from "../../../src/service/apiService";
import { Margin } from "@mui/icons-material";




const AdminCourseReport = () => {

  useTokenVerification();

const [course,setcourse]=useState([])

useEffect( () => {
  async function getcourse(){

    const response = await getcoursereports();
    console.log(response,'courses');
    setcourse(response)
  }
 getcourse()

  // setGridData(data); //
}, []);


 


  
 
  // console.log(course,'courses');
 
  
 
  
  



  

  const initialStudents = [
    {
      id: 1,
      name: "Student 1",
      topic: "Mern",
      Course: "23/04/2023",
      phoneNumber: "Task",
      branch: "Manu",
      email: "Submitted",
      status: "",
    },
    {
      id: 2,
      name: "Student 1",
      topic: "Mern",
      Course: "23/04/2023",
      phoneNumber: "Task",
      branch: "Manu",
      email: "Submitted",
      status: "",
    },
    // Your initial student data here
  ];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * itemsPerPage;
  const currentStudents = course?.slice(offset, offset + itemsPerPage);
  const totalPages = Math.ceil(course?.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };


  // Function to toggle select all students
 
  // Function to toggle individual student selection


  const [expandedRow, setExpandedRow] = useState(null);
const[arrow,setarrow]=useState(false)
  const toggleExpandRow = (rowIndex) => {
    if (rowIndex === expandedRow) {
      setExpandedRow(null);
    } else {
      setExpandedRow(rowIndex);
    }
    setarrow(!arrow)
  };
  const renderStudentDetails = (course, rowIndex) => {
    if (rowIndex === expandedRow) {
      return (
        <>
          <TableRow className="bg-slate-400 ">
          
            <TableCell>Sub Course</TableCell>
            <TableCell>Student</TableCell>
            <TableCell>No.of students</TableCell>
            <TableCell></TableCell>
          </TableRow>

          {course?.courses?.map((course, index) => (
            <TableRow className="bg-white" key={index}>
              <TableCell>{course?.name}</TableCell>
              <TableCell>{course?.createdAt}</TableCell>
              <TableCell>{course?.getStudents?.length}</TableCell>
            </TableRow>
          ))}
        </>
      );
    }
  };

  const handleExportToExcel = () => {
    if (course && course.length > 0) {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("StudentReport");
  
      // Add headers
      worksheet.addRow([
        "name",
        "Date",
        'No.of students'
      ]);
  
      // Add data
      course.forEach((item) => {
        item.courses?.forEach((course) => {
          worksheet.addRow([
            course?.name|| 0,
            course?.createdAt|| '',
            course?.getStudents?.length || '',
          ]);
        });
      });
  
      // Save the workbook
      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "StudentReport.xlsx";
        link.click();
      });
    } else {
      // Handle the case where activityResponse is empty or undefined
      console.error("No data to export");
    }
  };
  

  return (
    <div className=" p-10 rounded-xl text-white bg-white">
      <div className="mb-5">
      <Button
        className="mb-4"
        variant="contained"
        color="primary"
        onClick={handleExportToExcel}
      >
        Export to Excel
      </Button>
      </div>
      
   
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow className="h-2">
          <TableCell
                style={{ backgroundColor: "#475569", fontSize: "15px", color:"white" }}
              >
                
              </TableCell>
          <TableCell
                style={{ backgroundColor: "#475569", fontSize: "15px", color:"white" }}
              >
               Course Name
              </TableCell>
              <TableCell
                style={{ backgroundColor: "#475569", fontSize: "15px", color:"white" }}
              >
               Details
              </TableCell>
              <TableCell
                style={{ backgroundColor: "#475569", fontSize: "15px", color:"white" }}
              >
                created date
              </TableCell>
              
          </TableRow>
        </TableHead>
        <TableBody>
          {currentStudents.map((student, index) => (
            <React.Fragment key={index}>
              <TableRow className="h-2">
           
                <TableCell className="text-center">
                  <button onClick={() => toggleExpandRow(index)}>
                    {arrow ?
                  <BsFillArrowDownCircleFill size={25} />
                  :
                  <BsFillArrowUpCircleFill size={25}/>
                }
                  </button>
                </TableCell>

                <TableCell>{student?.name}</TableCell>
                <TableCell>{new Date(student?.createdAt).toLocaleDateString('en-GB')}</TableCell>
                <TableCell>{student?.details}</TableCell>
               
              </TableRow>
             
              {renderStudentDetails(student, index)}
            
             
            </React.Fragment>
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
        <span className="page-number  text-black">
          Page {currentPage + 1} of {totalPages}
        </span>
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
      
  </div>
        
  
  );
};

export default AdminCourseReport;

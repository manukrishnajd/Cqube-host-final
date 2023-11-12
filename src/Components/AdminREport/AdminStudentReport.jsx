import React, { useEffect, useState } from 'react';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";
import ExcelJS from 'exceljs';
import { getreports } from '../../service/apiService';
function AdminStudentReport() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when changing rows per page
  };

  // Define activityResponse, handleChangePage, and other necessary data/functions here.
  // You should replace the following placeholders with your actual data.

const [activityResponse,setactivityResponse]=useState([])

useEffect(()=>{

  fetchdata()

},[])

async function fetchdata(){
  let res=await getreports()
  console.log(res,'reports fetch');
  setactivityResponse(res)
}



  // const activityResponse = [
  //   {
  //     siNo: 1,
  //     name: "John Doe",
  //     course: "Computer Science",
  //     phoneNumber: "123-456-7890",
  //     branch: "Branch A",
  //     email: "john.doe@example.com",
  //     status: "Active",
  //     attendance: "90%",
  //     joiningDate: "2022-01-15",
  //     noOfTask: 10,
  //     taskMark: 80,
  //     taskTotalMark: 100,
  //     noOfPresentation: 5,
  //     presentationMark: 90,
  //     presentationTotalMark: 100,
  //     noOfTest: 3,
  //     testMark: 75,
  //     totalMark: 300,
  //   },
  //   {
  //     siNo: 2,
  //     name: "Jane Smith",
  //     course: "Electrical Engineering",
  //     phoneNumber: "987-654-3210",
  //     branch: "Branch B",
  //     email: "jane.smith@example.com",
  //     status: "Inactive",
  //     attendance: "75%",
  //     joiningDate: "2022-02-20",
  //     noOfTask: 8,
  //     taskMark: 70,
  //     taskTotalMark: 100,
  //     noOfPresentation: 6,
  //     presentationMark: 85,
  //     presentationTotalMark: 100,
  //     noOfTest: 4,
  //     testMark: 80,
  //     totalMark: 350,
  //   },
  //   // Add more dummy data as needed...
  // ];
  
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleExportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('StudentReport');

    // Add headers
    worksheet.addRow(['SI:NO','name','course',
    'phoneNumber',
    'branch',
    'email',
    'status',
    'attendance',
    'joiningDate',
    'noOfTask',
    'taskMark',
    'taskTotalMark',
    'noOfPresentation',
    'presentationMark',
    'presentationTotalMark',
    'noOfTest',
    'testMark',
    'totalMark' /* Add other headers based on your data structure... */]);

    // Add data
    activityResponse.forEach((item) => {
      worksheet.addRow([item.siNo,item.name,
        item.course,
        item.phoneNumber,
        item.branchName,
        item.email,
        item.status,
      item.attendance,
      item.joiningDate,
      item.noOfTask,
      item.taskMark,
      item.taskTotalMark,
      item.noOfPresentation,
      item.presentationMark,
      item.presentationTotalMark,
      item.noOfTest,
      item.testMark,
      item.totalMark /* Add other data based on your data structure... */]);
    });

    // Save the workbook
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'StudentReport.xlsx';
      link.click();
    });
  };

  return (
    <div>
      <Button classname='mb-4' variant="contained" color="primary" onClick={handleExportToExcel}>
        Export to Excel
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
               SI:NO
              </TableCell>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
                Name
              </TableCell>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
                Course Name
              </TableCell>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
                Trainer Name
              </TableCell>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
                Phone Number
              </TableCell>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
                Branch
              </TableCell>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
                Email
              </TableCell>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
               No of Task
              </TableCell>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
                No of Test
              </TableCell>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
                No of Presentation
              </TableCell>
              {/* <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
               Task Mark
              </TableCell>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
               Test Mark
              </TableCell>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
               Presentation Mark
              </TableCell> */}
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
               Total mark in Task
              </TableCell>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
               Total mark in test
              </TableCell>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
               Total mark in presentation
              </TableCell>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
              No of present days
              </TableCell>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
              No of Absent days
              </TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {activityResponse.map((item, index) => (
             <TableRow key={index}>
             <TableCell>{item.index}</TableCell>
             <TableCell>{item.name}</TableCell>
             {item.courses?.map((value)=>(

             
<>
             <TableCell>{value.courseName}</TableCell>
             <TableCell>{value.trainerName}</TableCell>
</>
             ))}
             <TableCell>{item.phoneNumber}</TableCell>
             <TableCell>{item.branchName}</TableCell>
             <TableCell>{item.email}</TableCell>
             <TableCell>{item.activities.task.length}</TableCell>
             <TableCell>{item.activities.test?.length}</TableCell>
             <TableCell>{item.activities.presentation?.length}</TableCell>
             {/* {item.activities.task.map((task)=>(
               <TableCell>{task.mark}</TableCell>
              
             ))}
             {item.activities.test.map((test)=>(
               <TableCell>{test.mark}</TableCell>
              
             ))}
             {item.activities.presentation.map((presentation)=>(
               <TableCell>{presentation.mark}</TableCell>
               
               ))} */}
               <TableCell>{item.totalMarkOf.task}</TableCell>
               <TableCell>{item.totalMarkOf.test}</TableCell>
               <TableCell>{item.totalMarkOf.presentation}</TableCell>
               <TableCell>{item.isPresentCounts}</TableCell>
               <TableCell>{item.isAbsentCounts}</TableCell>
           </TableRow>
           
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={activityResponse.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}

export default AdminStudentReport;

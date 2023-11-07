import React, { useState } from 'react';
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

function AdminCourseReports() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when changing rows per page
  };

  // Define activityResponse, handleChangePage, and other necessary data/functions here.
  // You should replace the following placeholders with your actual data.

  const activityResponse = [
    {
      siNo: 1,
      course: "Computer Science",
      Students: 100,
    },
    {
        siNo: 1,
        course: "Computer Science",
        Students: 100,
    },
    // Add more dummy data as needed...
  ];
  
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
               SI:NO
              </TableCell>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
                Course
              </TableCell>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
                Students
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activityResponse.map((item, index) => (
             <TableRow key={index}>
             <TableCell>{item.siNo}</TableCell>
             <TableCell>{item.course}</TableCell>
             <TableCell>{item.Students}</TableCell>

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

export default AdminCourseReports ;




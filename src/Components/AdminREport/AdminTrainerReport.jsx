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
import ExcelJS from 'exceljs';

function AdminAttendanceReports() {
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
      name: "John Doe",
      course: "Computer Science",
      Present: 50,
      Absent: 50,
      Total_days: 100,
    },
    {
      siNo: 2,
      name: "Jane Smith",
      course: "Electrical Engineering",
      Present: 50,
      Absent: 50,
      Total_days: 100
    },
    // Add more dummy data as needed...
  ];

  const handleExportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('StudentReport');

    // Add headers
    worksheet.addRow(['SI:NO','name','course',
    'Present',
    'Absent',
    'Total Days' /* Add other headers based on your data structure... */]);

    // Add data
    activityResponse.forEach((item) => {
      worksheet.addRow([item.siNo,item.name,
        item.course,
        item.Present,
        item.Absent,
        item.Total_days,/* Add other data based on your data structure... */]);
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
  
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
                Course
              </TableCell>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
                Present
              </TableCell>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
                Absent
              </TableCell>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
               Total Days
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activityResponse.map((item, index) => (
             <TableRow key={index}>
             <TableCell>{item.siNo}</TableCell>
             <TableCell>{item.name}</TableCell>
             <TableCell>{item.course}</TableCell>
             <TableCell>{item.Present}</TableCell>
             <TableCell>{item.Absent}</TableCell>
             <TableCell>{item.Total_days}</TableCell>
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

export default AdminAttendanceReports ;




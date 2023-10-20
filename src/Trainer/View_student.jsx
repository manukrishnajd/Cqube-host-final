import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
} from "@material-ui/core";
import { GiBrassEye } from "react-icons/gi";
import { Link } from "react-router-dom";
import { viewstudent } from "../service/trainerService";

const Students = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const id = localStorage.getItem('id');

  useEffect(() => {
    viewstudent(id)
      .then((res) => {
        setData(res);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const tableHeaders = [
    "Name",
    "Phone Number",
    "Email",
    "Action",
  ];

  const handleViewRow = (student) => {
    // Handle viewing a row (if needed)
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mx-auto p-3 text-white rounded-3xl">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-black font-bold mb-4">Student</h1>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="h-fit">
                {tableHeaders.map((header, index) => (
                  <TableCell
                    key={index}
                    style={{
                      backgroundColor: "#475569",
                      fontSize: "17px",
                      color: "white",
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className="text-lg">
              {currentData.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.phoneNumber}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    <Link to="/trainer/detail">
                      <IconButton
                        size="small"
                        title="View more"
                        onClick={() => handleViewRow(student)}
                      >
                        <GiBrassEye size={25} />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="pagination-container text-black">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="page-number">Page {currentPage} of {totalPages}</span>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Students;

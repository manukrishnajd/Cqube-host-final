import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Header } from "../Components";
import { GiBrassEye } from "react-icons/gi";
import FormPop from "../Components/studentComponent/Formpopup";
import { Link } from "react-router-dom";
import { viewstudent } from "../service/trainerService";

const Students = () => {
  const [data, setData] = useState([]);
  const id = localStorage.getItem('id');
  console.log(id);
  // const id = "651e9217bfc133e09c62e6ae"

  useEffect(() => {
    viewstudent(id)
      .then((res) => {
        console.log(res,'responses');
        setData(res); // Set the fetched data into the 'data' state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Define the table headers and initial data
  const tableHeaders = [
    "Name",
    "Course",
    "Phone Number",
    "Branch",
    "Email",
    "Status",
    "Action",
  ];

  const handleViewRow = (student) => {
    // Handle viewing a row (if needed)
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
              {data.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.courseRef.name}</TableCell>
                  <TableCell>{student.phoneNumber}</TableCell>
                  <TableCell>{student.branch}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.status}</TableCell>
                  <TableCell>
                    <Link to="/trainer/detail">
                      <GiBrassEye
                        size={25}
                        title="View more"
                        onClick={() => handleViewRow(student)}
                      />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Students;

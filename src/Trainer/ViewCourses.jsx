import React, { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button } from "@material-ui/core";
import { GiBrassEye } from "react-icons/gi";
import { Link } from "react-router-dom";
import { trainerdetail, studentbycourse, useTokenVerification } from "../service/trainerService";
import CourseCard from "./CourseCard";
const id = localStorage.getItem('id');
console.log(id);

const tableHeaders = [
  "Name",
  "Course",
  "Email",
  "Status",
  "Phone Number",
  "",
  
];

export function ViewCourses() {

  useTokenVerification()

  const [data, setdata] = useState([]);
  const [studentdata, setstudent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    trainerdetail(id).then((res) => {
      console.log(res, 'responsekjn');
      setdata(res.courseRef);
    });
  }, []);

  console.log(data, 'datas');

  const [stud, setstud] = useState(false);

  const student = (courseid, id) => {
    console.log(courseid, id, 'bhjnk');
    studentbycourse(courseid, id).then((res) => {
      console.log(res, 'responses ghjn');
      setstudent(res);
    });
    setstud(!stud);
  };

  const handleViewRow = (studentid) => {
    // Handle viewing a row (if needed)
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentStudentData = studentdata.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(studentdata.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <div className="flex gap-4 flex-wrap">
        {data.map((item) => {
          return (
            <CourseCard course={item.name} description={item.details} syllabus={item.syllabus} st={() => student(item._id, id)} />
          );
        })}
      </div>

      {stud && (
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
                  {currentStudentData.map((student) => (
                    <TableRow key={student._id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.courses.map((course, index) => (
                      <span key={index}>{course.assignedCourseRef.name}</span>
                    ))}</TableCell>

                      <TableCell>{student.phoneNumber}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.phoneNumber}</TableCell>
                      <TableCell>
                        <Link to="/trainer/detail">
                          <IconButton
                            size="small"
                            title="View more"
                            onClick={() => handleViewRow(student._id)}
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
      )}
    </>
  );
}

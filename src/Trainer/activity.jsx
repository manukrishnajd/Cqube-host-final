import React, { useState } from 'react';
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

const Activity = () => {
  const [selectedStudentId, setSelectedStudentId] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Perform task assignment logic here, using selectedStudentId, taskDescription, and dueDate
  
      // Clear form fields and close the modal
      setSelectedStudentId('');
      setTaskDescription('');
      setDueDate('');
      setIsModalOpen(false);
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

  const [students] = useState(initialStudents);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * itemsPerPage;
  const currentStudents = students.slice(offset, offset + itemsPerPage);
  const totalPages = Math.ceil(students.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  

  return (
    <div>

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
                <TableCell>{student.Course}</TableCell>
                <TableCell>{student.phoneNumber}</TableCell>
                <TableCell>{student.branch}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.status}</TableCell>
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

    </div>
  );
};

export default Activity;

import React, { useState } from "react";
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
import Modal from "react-modal";
import { Verified, activityadd, useTokenVerification, viewactivity, viewstudent } from "../service/trainerService";
import { useEffect } from "react";
import { errorToastify } from "../Components/Student/toastify";



const TrainerTask = () => {

  useTokenVerification();
  const id = localStorage.getItem('id');
  const [type, setType] = useState(""); // Define and initialize 'type' state
  const [topic, setTopic] = useState(""); // Define and initialize 'topic' state
  const [notes, setNotes] = useState(""); // Define and initialize 'notes' state
  const [mark, setMark] = useState("");

  const [data, setData] = useState([]);
  const [activitydata, setactivityData] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState(null);
const [selectedCourse, setSelectedCourse] = useState(null);


  // useEffect(() => {
  //   viewstudent(id)
  //     .then((res) => {
  //       setData(res);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  // useEffect(() => {
  //   viewactivity()
  //     .then((res) => {
  //       setactivityData(res);
  //       console.log(activitydata,'activities');
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  const getactivity = async () => {
    try {
      const response = await viewactivity();
      setactivityData(response.result);
    } catch (error) {
      errorToastify(error?.message);
    }
  };
  console.log(activitydata,'datas of activity');

  useEffect(() => {
    getactivity();

    // setGridData(data); //
  }, []);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const requestData = {
      type: selectedType,
      topic,
      notes,
      duedate,
      mark,
      studentsRef: selectedStudents, // Pass the selected students
      courseRef: selectedCourse,
      trainersRef: id
      // Add other data properties as needed
    };
  
    activityadd(requestData).then((res) => {
      console.log(res, 'response');
    }).catch((error) => {
      console.log(error.message);
    });
  
    // Clear form fields and close the modal
    setType("");
    setTopic("");
    setNotes("");
    setDueDate("");
    setMark("");
    setSelectedStudents([]); // Clear selected students
    setIsModalOpen(false);
  };

  const handleStudentSelection = (e) => {
    const studentId = e.target.value;
    setSelectedStudents((prevSelectedStudents) => {
      if (prevSelectedStudents.includes(studentId)) {
        // If the student is already selected, remove them from the selection
        return prevSelectedStudents.filter((id) => id !== studentId);
      } else {
        // If the student is not selected, add them to the selection
        return [...prevSelectedStudents, studentId];
      }
    });
  };
  



  
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [duedate, setDueDate] = useState("");
  const [selectAll, setSelectAll] = useState(false); // State to track if all students are selected
  const [selectedStudents, setSelectedStudents] = useState([]); // State to track selected individual students



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

  const [students] = useState(initialStudents);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * itemsPerPage;
  const currentStudents = activitydata?.slice(offset, offset + itemsPerPage);
  const totalPages = Math.ceil(activitydata?.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const openModal = (type) => {
    setSelectedType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedType("");
    setIsModalOpen(false);
  };
const [studenttask,setstudenttask]=useState()
  const viewstudents=()=>{
    {activitydata.studentsRef.map((res)=>(
        setstudenttask(res.name)
     
    ))}
  }

  // Function to toggle select all students
  const toggleSelectAll = () => {
    if (selectAll) {
      // If all students are currently selected, unselect all
      setSelectedStudents([]);
    } else {
      // If not all students are selected, select all
      setSelectedStudents(students.map((student) => student.id));
    }
    setSelectAll(!selectAll);
  };

  // Function to toggle individual student selection
  const toggleStudentSelection = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      // If the student is already selected, remove them from the selection
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    } else {
      // If the student is not selected, add them to the selection
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const [expandedRow, setExpandedRow] = useState(null);

  const toggleExpandRow = (rowIndex) => {
    if (rowIndex === expandedRow) {
      setExpandedRow(null);
    } else {
      setExpandedRow(rowIndex);
    }
  };

  const renderStudentDetails = (student, rowIndex) => {
    if (rowIndex === expandedRow) {
      return (
        <TableRow>
          <TableCell colSpan="7">
            {/* Render student details here */}
            <div>
              <p>Student Name: {student.name}</p>
              <p>Topic: {student.topic}</p>
              <p>Due Date: {student.duedate}</p>
              <p>Type: {student.type}</p>
              <p>Total Mark: {student.mark}</p>
              <p>Status: {student.status}</p>
              {/* Add more details as needed */}
            </div>
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <div className=" p-10 rounded-xl text-white bg-white">
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow className="h-2">
          <TableCell
                style={{ backgroundColor: "#475569", fontSize: "15px", color:"white" }}
              >
                Student Name
              </TableCell>
              <TableCell
                style={{ backgroundColor: "#475569", fontSize: "15px", color:"white" }}
              >
                Topic
              </TableCell>
              <TableCell
                style={{ backgroundColor: "#475569", fontSize: "15px",color:"white" }}
              >
                Due Date
              </TableCell>
              <TableCell
                style={{ backgroundColor: "#475569", fontSize: "15px", color:"white" }}
              >
                Type
              </TableCell>
              <TableCell
                style={{ backgroundColor: "#475569", fontSize: "15px", color:"white" }}
              >
                Total Mark
              </TableCell>
              <TableCell
                style={{ backgroundColor: "#475569", fontSize: "15px", color:"white" }}
              >
                Status
              </TableCell>
              {/* <TableCell
                style={{ backgroundColor: "#475569", fontSize: "15px",color:"white" }}
              >
                Mark
              </TableCell> */}
              <TableCell
                style={{ backgroundColor: "#475569", fontSize: "15px",color:"white" }}
              ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentStudents.map((student, index) => (
            <React.Fragment key={index}>
              <TableRow className="h-2">
           
                <TableCell>
                  <button onClick={() => toggleExpandRow(index)}>
                    View Student
                  </button>
                </TableCell>

                <TableCell>{student.topic}</TableCell>
                <TableCell>{student.duedate}</TableCell>
                <TableCell>{student.type}</TableCell>
                <TableCell>{student.mark}</TableCell>
                <TableCell>{student.status}</TableCell>
                <TableCell>
                  <button onClick={() => openModal("evaluate")} className="bg-slate-600 rounded text-white p-3 hover-bg-slate-400">
                    evaluate
                  </button>
                  </TableCell>
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

export default TrainerTask;

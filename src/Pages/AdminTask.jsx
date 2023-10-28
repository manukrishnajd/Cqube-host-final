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



const AdminTask = () => {

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

  const renderForm = () => {
    switch (selectedType) {
      case "evaluate":

      return (
        
        <div className="bg-white p-4 rounded-lg shadow-md">
         <div className="mb-4">

        <span className="font-bold">Submission Date and Time : </span> <span>23/05/2023 12:00</span>
         </div>
        
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-lg font-medium text-gray-800">
              Topic :
            </label>
           
          </div>
          {/* <div className="mb-4">
            <label className="block text-lg font-medium text-gray-800">
              Student:
            </label>
            <input
              type="text"
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              value={
                students.find((student) => student.id === selectedStudentId)
                  ?.name || ""
              }
              readOnly
            />
          </div> */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-800">
              Answer:
            </label>
            
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-800">
             Notes :
            </label>
            
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-800">
              Remarks:
            </label>
           
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-800">
              mark
            </label>
            <input
              type="number"
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <a href="" download>view attachment</a>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
            >
              <span className="text-white font-lg margin-auto">Evaluate</span>
            </button>
          </div>
        </form>
      </div>
      )


      case "presentation":
        return (
          <div className="bg-white text-white p-4 rounded-lg shadow-md">
          {/* <h2 className="text-lg font-semibold text-black mb-2">Test</h2> */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-lg font-medium text-black">Type:</label>
              <input type="text" value={type} readOnly placeholder="Test"
              className="h-3"
                                />
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Topic"
                className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"

              />
            </div>
            <div className="mb-4">
              <textarea
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes"
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"

              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-black">Due Date:</label>
              <input
                type="datetime-local"
                value={duedate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="Due Date"
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"

              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                value={mark}
                onChange={(e) => setMark(e.target.value)}
                placeholder="Total mark"
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"

              />
            </div>
    
            <div className="mb-4">
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"

              >
                <option value="">Select a student</option>
                {data.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              type="submit"
              className="bg-slate-600 hover:bg-slate-800 text-white ml-auto font-bold py-2 px-4 rounded"
            >
              <span className="text-white font-lg margin-auto">Submit</span>
            </button>
          </form>
          </div>
        );
      case "task":
        return (
          <div className="bg-white text-white p-4 rounded-lg shadow-md">
          {/* <h2 className="text-lg font-semibold text-black mb-2">Test</h2> */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-lg font-medium text-black">Type:</label>
              <input type="text" value={type} readOnly placeholder="Test"
              className="h-3"
                                />
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Topic"
                className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"

              />
            </div>
            <div className="mb-4">
              <textarea
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes"
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"

              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-black">Due Date:</label>
              <input
                type="datetime-local"
                value={duedate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="Due Date"
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"

              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                value={mark}
                onChange={(e) => setMark(e.target.value)}
                placeholder="Total mark"
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"

              />
            </div>
    
            <div className="mb-4">
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"

              >
                <option value="">Select a student</option>
                {data.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              type="submit"
              className="bg-slate-600 hover:bg-slate-800 text-white ml-auto font-bold py-2 px-4 rounded"
            >
              <span className="text-white font-lg margin-auto">Submit</span>
            </button>
          </form>
          </div>
        );
      case "test":
        return (
          <div className="bg-white text-white p-4 rounded-lg shadow-md">
          {/* <h2 className="text-lg font-semibold text-black mb-2">Test</h2> */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-lg font-medium text-black">Type:</label>
              <input type="text" value={type} readOnly placeholder="Test"
              className="h-3"
                                />
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Topic"
                className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"

              />
            </div>
            <div className="mb-4">
              <textarea
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes"
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"

              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-black">Due Date:</label>
              <input
                type="datetime-local"
                value={duedate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="Due Date"
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"

              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                value={mark}
                onChange={(e) => setMark(e.target.value)}
                placeholder="Total mark"
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"

              />
            </div>
    
            <div className="mb-4">
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"

              >
                <option value="">Select a student</option>
                {data.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              type="submit"
              className="bg-slate-600 hover:bg-slate-800 text-white ml-auto font-bold py-2 px-4 rounded"
            >
              <span className="text-white font-lg margin-auto">Submit</span>
            </button>
          </form>
          </div>
        );
    }
  };

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

  return (
    <div className=" p-10 rounded-xl text-white bg-white">
     
      

      <TableContainer  component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="h-2">
              {/* <TableCell
                style={{ backgroundColor: "#475569", fontSize: "15px",  }}
              >
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                />
              </TableCell> */}
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
              <TableRow key={index} className="h-2">
                {/* <TableCell className="h-2">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student._id)}
                    onChange={() => toggleStudentSelection(student._id)}
                  />
                </TableCell> */}
                <TableCell>{student.name}</TableCell>
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

      <Modal
        className=" p-5 border-none  rounded-lg modal_width m-auto mt-4"
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Assign Student Modal"
        style={{
          overlay: {
            zIndex: 10000,
          },
          content: {
            zIndex: 1001,
          },
        }}
      >
        <div className="overflow-y-scroll modal-content-scrollable">

        {/* <h2 className='text-white text-2xl m-auto w-fit'>Assign {selectedType && selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}</h2> */}
        {renderForm()}
        </div>
        <div className="align-middle">

        <button
          onClick={closeModal}
          className="text-sm text-gray-600 hover:text-gray-800"
          >
          Cancel
        </button>
          </div>
      </Modal>
    </div>
  );
};

export default AdminTask;

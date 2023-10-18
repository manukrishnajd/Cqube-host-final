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



const TrainerTask = () => {



  

  const [mark, sertmark] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectAll, setSelectAll] = useState(false); // State to track if all students are selected
  const [selectedStudents, setSelectedStudents] = useState([]); // State to track selected individual students

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform task assignment logic here, using selectedStudentId, taskDescription, and dueDate
    // Clear form fields and close the modal
    setSelectedStudentId("");
    setTaskDescription("");
    setDueDate("");
    setIsModalOpen(false);
  };

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
  const currentStudents = students.slice(offset, offset + itemsPerPage);
  const totalPages = Math.ceil(students.length / itemsPerPage);

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
           

          <h2 className="text-lg font-semibold mb-2 text-black">Presentation </h2>
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
              {/* <label className="block text-lg font-medium text-gray-800">
                Topic :
              </label> */}
              <input
                type="text"
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="Topic"
                required
              />
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
              {/* <label className="block text-lg font-medium text-gray-800">
                Test Description:
              </label> */}
              <textarea
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              rows="3"
                placeholder="Enter task description"
                value="Test Description"
                onChange={(e) => setTaskDescription(e.target.value)}
                required
                
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-black">
                Due Date:
              </label>
              <input
                type="datetime-local"
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
              >
                <span className="text-white font-lg margin-auto">Assign</span>
              </button>
            </div>
          </form>
        </div>
        );
      case "task":
        return (
          <div className="bg-white text-white p-4 rounded-lg shadow-md">
           

            <h2 className="text-lg font-semibold text-black mb-2">Task Assignment:</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                {/* <label className="block text-lg font-medium text-white">
                  Topic :
                </label> */}
                <input
                  type="text"
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  placeholder="Topic"
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
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
                {/* <label className="block text-lg font-medium text-white">
                  Task Description:
                </label> */}
                <textarea
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              rows="3"
                  placeholder="Enter task description"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium text-black">
                  Due Date:
                </label>
                <input
                  type="datetime-local"
                  className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                {/* <label className="block text-lg font-medium text-white">
                  Attachment:
                </label> */}
                <input
                  type="file"
                  className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="bg-slate-600 hover:bg-slate-800 text-white ml-auto font-bold py-2 px-4 rounded"
                >
                  <span className="text-white font-lg margin-auto">Assign</span>
                </button>
              </div>
            </form>
          </div>
        );
      case "test":
        return (
          <div className="bg-white text-white p-4 rounded-lg shadow-md">
           

            <h2 className="text-lg text-black font-semibold mb-2">Test </h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                {/* <label className="block text-lg font-medium text-gray-800">
                  Topic :
                </label> */}
                  <input
                    type="text"
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    value={dueDate}
                    placeholder="Topic"
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                  />
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
                {/* <label className="block text-lg font-medium text-gray-800">
                  Test Description:
                </label> */}
                <textarea
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              rows="3"
                  placeholder="Enter task description"
                  onChange={(e) => setTaskDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium text-black">
                  Due Date:
                </label>
                <input
                  type="datetime-local"
                  className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </div>
              <div classNam e="mb-4">
              <a href="/images/myw3schoolsimage.jpg" download></a>
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
                >
                  <span className="text-white font-lg margin-auto">Assign</span>
                </button>
              </div>
             
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
      <div className="flex gap-3">

        <button className="assign text-white bg-slate-600" onClick={() => openModal("task")}>
          Task
        </button>
        <button className="assign  text-white bg-slate-600" onClick={() => openModal("presentation")}>
          Presentation
        </button>
        <button className="assign  text-white bg-slate-600" onClick={() => openModal("test")}>
          Test
        </button>
      </div>
      

      <TableContainer  component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="h-2">
              <TableCell
                style={{ backgroundColor: "#475569", fontSize: "15px",  }}
              >
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                />
              </TableCell>
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
                Evaluated by
              </TableCell>
              <TableCell
                style={{ backgroundColor: "#475569", fontSize: "15px", color:"white" }}
              >
                Status
              </TableCell>
              <TableCell
                style={{ backgroundColor: "#475569", fontSize: "15px",color:"white" }}
              >
                Mark
              </TableCell>
              <TableCell
                style={{ backgroundColor: "#475569", fontSize: "15px",color:"white" }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentStudents.map((student, index) => (
              <TableRow key={index} className="h-2">
                <TableCell className="h-2">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => toggleStudentSelection(student.id)}
                  />
                </TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.topic}</TableCell>
                <TableCell>{student.Course}</TableCell>
                <TableCell>{student.phoneNumber}</TableCell>
                <TableCell>{student.branch}</TableCell>
                <TableCell>{student.email}</TableCell>
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

export default TrainerTask;

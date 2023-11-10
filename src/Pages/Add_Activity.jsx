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
  TextField,
} from "@material-ui/core";
import { GiBrassEye } from "react-icons/gi";
import { Link } from "react-router-dom";
import { activityadd, useTokenVerification, viewstudent } from "../service/trainerService";
import Modal from "react-modal";
import { getStudent } from "../service/apiService";
const AdminAddActivity = () => {

  useTokenVerification()
  const [students, setStudents] = useState([]);
  
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const id = localStorage.getItem("id");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourseRefId, setSelectedCourseRefId] = useState([]);
  //activity
  const [type, setType] = useState(""); // Define and initialize 'type' state
  const [topic, setTopic] = useState(""); // Define and initialize 'topic' state
  const [notes, setNotes] = useState(""); // Define and initialize 'notes' state
  const [mark, setMark] = useState("");
  const [presenttype, setpresenttype] = useState("");
  const [meetlink, setmeetlink] = useState("");
  const [venue, setvenue] = useState("");
  
  const [activitydata, setactivityData] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  //activity usestates

  // Utility function to get the courseRef.id
  const getCourseRefId = (student) => {
    console.log(student,'dwed');
    const course = student?.courses?.find((course) => course._id);
    console.log(course._id,'courses ids kjhg');
    return course ? course._id : "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      type: selectedType,
      topic,
      notes,
      duedate,
      mark,
      studentsRef: selectedStudentIds, // Pass the selected students
      courseRef: selectedCourseRefId, // Update to use selectedCourseRefId
      trainersRef: id,
      // mode:presenttype,
      // meetlink:meetlink,
      // venue:venue
      // Add other data properties as needed
    };
  

    activityadd(requestData)
      .then((res) => {
        console.log(res, "response");
      })
      .catch((error) => {
        console.log(error.message);
      });

    // Clear form fields and close the modal
    setType("");
    setTopic("");
    setNotes("");
    setDueDate("");
    setMark("");
    // setSelectedStudentIds([]); // Clear selected students
    setIsModalOpen(false);
  };

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [duedate, setDueDate] = useState("");
  const [selectAll, setSelectAll] = useState(false); // State to track if all students are selected

  useEffect(() => {
    getStudent().then((res)=>{
      console.log(res,'responsedsdsjdh');
      setStudents(res)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const tableHeaders = [
    "Select",
    "Name",
    "Course",
    "Phone Number",
    "Email",
    "Action",
  ];

  const [selectedStudentIds, setSelectedStudentIds] = useState([]);

  const handleViewRow = (student) => {
    // Handle viewing a row (if needed)
  };
  const handleSelectStudent = (studentId, courseRefId) => {
    // Check if the studentId is in the selectedStudentIds array
    console.log(studentId,'uyeth');
    if (selectedStudentIds.includes(studentId)) { 
      // If it's already selected, remove it
      setSelectedStudentIds(
        selectedStudentIds.filter((id) => id !== studentId)
      );
      // Clear the selectedCourseRefId since no students are selected
      setSelectedCourseRefId("");
    } else {
      // If it's not selected, add it
      setSelectedStudentIds([...selectedStudentIds, studentId]);
      // Set the selectedCourseRefId to the provided courseRefId
      setSelectedCourseRefId([...selectedCourseRefId, courseRefId]);
    }
    console.log(selectedStudentIds, "student ids");
    console.log(selectedCourseRefId, "course ids");
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentData = students
    .filter((student) => {
      return (
        student?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.courses.some((course) =>
          course.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      );
    })
    .slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(students.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  //activity

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
              <span className="font-bold">Submission Date and Time : </span>{" "}
              <span>23/05/2023 12:00</span>
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
                <a href="" download>
                  view attachment
                </a>
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
                >
                  <span className="text-white font-lg margin-auto">
                    Evaluate
                  </span>
                </button>
              </div>
            </form>
          </div>
        );

      case "presentation":
        return (
          <div className="bg-white text-white p-4 rounded-lg shadow-md">
            {/* <h2 className="text-lg font-semibold text-black mb-2">Test</h2> */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-lg font-medium text-black">
                  Type:
                </label>
                <input
                  type="text"
                  value={type}
                  readOnly
                  placeholder="Test"
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
                <select                  
                 className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                name="" 
                id="" 
                onChange={(e) => setpresenttype(e.target.value)}>
                  <option disabled value="">Select mode</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
              {presenttype=='online' &&
              <div className="mb-4">
                <input
                  type="text"
                  value={meetlink}
                  onChange={(e) => setmeetlink(e.target.value)}
                  placeholder="link"
                  className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                />
              </div>
                }
                {presenttype=='offline' &&
                <div className="mb-4">
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setvenue(e.target.value)}
                  placeholder="Venue"
                  className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                />
              </div>
                }
              
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
                <label className="block text-lg font-medium text-black">
                  Date:
                </label>
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
                <label className="block text-lg font-medium text-black">
                  Type:
                </label>
                <input
                  type="text"
                  value={type}
                  readOnly
                  placeholder="Test"
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
                <label className="block text-lg font-medium text-black">
                  Due Date:
                </label>
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

              {/* <div className="mb-4">
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
            </div> */}

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
                <label className="block text-lg font-medium text-black">
                  Type:
                </label>
                <input
                  type="text"
                  value={type}
                  readOnly
                  placeholder="Test"
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
                <select                  
                 className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                name="" 
                id="" 
                onChange={(e) => setpresenttype(e.target.value)}>
                  <option disabled value="">Select mode</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
              {presenttype=='online' &&
              <div className="mb-4">
                <input
                  type="text"
                  value={meetlink}
                  onChange={(e) => setmeetlink(e.target.value)}
                  placeholder="Meet link"
                  className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                />
              </div>
    }
    {presenttype=='offline' &&
                <div className="mb-4">
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setvenue(e.target.value)}
                  placeholder="Venue"
                  className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                />
              </div>
                }
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
                <label className="block text-lg font-medium text-black">
                  Due Date:
                </label>
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

  //activity end
  console.log(selectedStudentIds,'student ids');
  return (
    <div className="container mx-auto p-3 text-white rounded-3xl">
      <div className="container mx-auto p-4">
        <div className="flex gap-3">
          <button
            className="assign text-white bg-slate-600"
            onClick={() => openModal("task")}
          >
            Task
          </button>
          <button
            className="assign  text-white bg-slate-600"
            onClick={() => openModal("presentation")}
          >
            Presentation
          </button>
          <button
            className="assign  text-white bg-slate-600"
            onClick={() => openModal("test")}
          >
            Test
          </button>
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
        <h1 className="text-2xl text-black font-bold mb-4">Student</h1>

        <div className="mb-2 gap-6 flex items-center">
          <TextField
            label="Search by Name or Course"
            variant="outlined"
            height="30px"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

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
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedStudentIds.includes(student._id)}
                      onChange={() =>
                        handleSelectStudent(
                          student._id,
                          getCourseRefId(student)
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    {student?.courses?.map((course, index) => (
                      <span key={index}>{course.name}</span>
                    ))} 
                  </TableCell>
                  <TableCell>{student.phoneNumber}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    <Link to={`/trainer/detail/${student._id}`}>
                      <IconButton
                        size="small"
                        title="View more"
                        onClick={() => handleViewRow(student)}
                      >
                        <GiBrassEye size={25} />
                      </IconButton>
                    </Link>
              
                  </TableCell>

                  <TableCell>
                    
                      {/* <IconButton
                        size="small"
                        title="View more"
                        onClick={() => handledelete(student._id)}
                      >
                        <AiFillDelete size={25} />
                      </IconButton> */}
                  
              
                  </TableCell>
                  <TableCell>
{/*                     
                      <IconButton
                        size="small"
                        title="View more"
                        onClick={() => handleedit(student._id)}
                      >
                        <AiFillEdit size={25} />
                      </IconButton> */}
                  
              
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
          <span className="page-number">
            Page {currentPage} of {totalPages}
          </span>
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

export default AdminAddActivity;

import React, { useState, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";
import { Header } from "../Components";
import StudentDetailsModal from "./StudentDetailsModal";
import {
  addStudent,
  getAllTrainers,
  getBranch,
  getCourse,
  getStudent,
} from "../service/apiService";

const Students = () => {
  const [gridKey, setGridKey] = useState(0);
  const [students, setStudents] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [branches, setBranches] = useState([]);
  const [courseRef, setCourseREf] = useState([]);
  const [joinedDate, setJoinedDate] = useState();

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    git: "",
    linkedIn: "",
    selectedTrainer: "",
    selectedBranch: "",
    selectedCourse: "",
    status: "",
    joinedDate: "",
  });

  useEffect(() => {
    // Fetch branches from the API
    getBranch()
      .then((response) => {
        setBranches(response); // Assuming response is an array of branches
      })
      .catch((error) => {
        console.error("Error fetching branches:", error);
      });
  }, []); // Empty dependency array to run this effect only once

  useEffect(() => {
    getAllTrainers().then((response) => {
      setTrainers(response);
    });
    const delay = 500; // 500ms debounce delay

    const debounceSearch = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, delay);

    return () => clearTimeout(debounceSearch);
    // let response =
  }, [searchTerm]);


  useEffect(() => {
    // Fetch student data from the API when the component mounts
    const fetchStudents = async () => {
      try {
        const studentsData = await getStudent();
        setStudents(studentsData);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []); 

  const filteredStudents = debouncedSearchTerm
    ? students.filter((student) =>
        student?.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    : students;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({
      ...newStudent,
      [name]: value,
    });
  };

  const handleAddStudent = () => {
    const {
      name,
      phone,
      email,
      password,
      git,
      joinedDate,
      linkedIn,
      selectedTrainer,
      selectedBranch,
      selectedCourse,
      status,
    } = newStudent;

    if (name && phone && email && selectedBranch) {
      const newStudentData = {
        name,
        email,
        password,
        phoneNumber: phone,
        branchRef: selectedBranch,
        courseRef: selectedCourse,
        assignedTrainersRef: selectedTrainer,
        github: git,
        linkedin: linkedIn,
        status: true,
        joinedDate,
      };

      addStudent(newStudentData)
        .then(() => {
          const updatedStudents = [...students, newStudentData];
          setStudents(updatedStudents);
          setGridKey((prevKey) => prevKey + 1);
          setNewStudent({
            name: "",
            phone: "",
            email: "",
            password: "",
            git: "",
            linkedIn: "",
            selectedTrainer: "",
            selectedBranch: "",
            selectedCourse: "",
            status: "",
            joinedDate: ""
          });
          setEditingIndex(null);
        })
        .catch((error) => {
          console.error("Error adding student:", error);
          alert("Failed to add student. Please try again.");
        });
    } else {
      alert("Please fill all the required fields.");
    }
  };

  const [course_data, setCourseData] = useState([]);
  useEffect(() => {
    getCourse().then((res) => {
      setCourseData(res);
    });
    getAllTrainers();
  }, []);

  const handleUpdateStudent = () => {
    const updatedStudents = students?.map((student, index) => {
      if (index === editingIndex) {
        return { ...student, ...newStudent };
      }
      return student;
    });

    setStudents(updatedStudents);
    setGridKey((prevKey) => prevKey + 1);
    setNewStudent({
      name: "",
      phone: "",
      email: "",
      git: "",
      linkedIn: "",
      selectedTrainer: "",
      selectedBranch: "",
      selectedCourse: "",
      status: "",
      joinedDate: ""
    });
    setEditingIndex(null);
  };

  const handleEditRow = (student) => {
    setNewStudent({ ...student });
    setEditingIndex(students.indexOf(student));
  };

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleViewRow = (student) => {
    setSelectedStudent(student);
    setIsModalVisible(true);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const gridColumns = [
    { field: "name", headerText: "Name", width: 100 },
    { field: "email", headerText: "Email", width: 100 },
    { field: "phone", headerText: "Phone", width: 100 },
    { field: "password", headerText: "Password", width: 100 },
    { field: "git", headerText: "Git", width: 100 },
    { field: "linkedIn", headerText: "LinkedIn", width: 100 },
    { field: "selectedTrainer", headerText: "Trainer", width: 100 },
    { field: "selectedBranch", headerText: "Branch", width: 100 },
    { field: "selectedCourse", headerText: "Course", width: 100 },
    { field: "status", headerText: "Status", width: 100 },
    { field: "joinedDate", headerText: "Joined Date", width: 100 },
    {
      headerText: "Actions",
      width: 120,
      template: (rowdata) => {
        return (
          <div>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 ml-2"
              onClick={() => handleEditRow(rowdata)}
            >
              Edit
            </button>
            <button
              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700 ml-2"
              onClick={() => handleViewRow(rowdata)}
            >
              View
            </button>
          </div>
        );
      },
    },
  ];
  

  const gridData = students?.map((student, index) => ({
    ...student,
    id: index + 1,
  }));
  return (
    <div className="container mx-auto p-10 bg-white rounded-3xl">
      <Header category="Page" title="Students" />

      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Student Profile Management</h1>

        <div className="mb-4">
          <input
            className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <h2 className="text-xl font-bold mb-2">Add Student</h2>
          <div className="flex flex-wrap mb-4">
            <input
              className="border rounded p-2 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="Name"
              name="name"
              value={newStudent.name}
              onChange={handleInputChange}
            />
            <input
              className="border rounded p-2 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="Phone"
              name="phone"
              value={newStudent.phone}
              onChange={handleInputChange}
            />
            <input
              className="border rounded p-2 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="Email"
              name="email"
              value={newStudent.email}
              onChange={handleInputChange}
            />
            <input
              className="border rounded p-2 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="password"
              name="password"
              value={newStudent.password}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <input
              className="border rounded p-2 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="Git"
              name="git"
              value={newStudent.git}
              onChange={handleInputChange}
            />
            <input
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              type="date"
              placeholder="date"
              value={newStudent.joinedDate} // Use newStudent.joinedDate instead of joinedDate
              onChange={handleInputChange} // Update state using handleInputChange
              name="joinedDate" // Set the correct name
            />

            <input
              className="border rounded p-2 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="LinkedIn"
              name="linkedIn"
              value={newStudent.linkedIn}
              onChange={handleInputChange}
            />
            <select
              className="border rounded p-2 mr-2 mb-2 sm:mb-0"
              name="selectedTrainer"
              value={newStudent.selectedTrainer}
              onChange={handleInputChange}
            >
              <option value="">Select Trainer</option>
              {trainers?.map((item) => {
                return <option value={item._id}>{item.name}</option>;
              })}
            </select>
            <select
              className="border rounded p-2 mr-2 mb-2 sm:mb-0"
              name="selectedBranch"
              value={newStudent.selectedBranch}
              onChange={handleInputChange}
            >
              <option value="">Select Branch</option>
              {branches?.map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {branch.name}
                </option>
              ))}
            </select>

            <select
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              value={newStudent.selectedCourse} // Use selectedCourse instead of courseRef
              onChange={handleInputChange} // Update state using handleInputChange
              name="selectedCourse" // Set the correct name
            >
              <option value="" disabled>
                Select Course
              </option>
              {course_data?.map((item) => {
                return (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>

          {editingIndex !== null ? (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 hover:shadow-orange"
              onClick={handleUpdateStudent}
            >
              Update Student
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 hover:shadow-orange"
              onClick={handleAddStudent}
            >
              Add Student
            </button>
          )}
        </div>

        <GridComponent
          key={gridKey}
          dataSource={gridData}
          allowPaging
          allowSorting
          editSettings={{ allowEditing: true }}
          width="auto"
          actionBegin={(args) => {
            if (args.requestType === "rowclick") {
              const selectedStudent = students[args.rowIndex];
              setSelectedStudent(selectedStudent);
              setIsModalVisible(true);
            }
          }}
        >
          <ColumnsDirective>
            {gridColumns?.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter]} />
        </GridComponent>

        {selectedStudent && (
          <StudentDetailsModal
            selectedStudent={selectedStudent}
            toggleModal={toggleModal}
          />
        )}
      </div>
    </div>
  );
};

export default Students;

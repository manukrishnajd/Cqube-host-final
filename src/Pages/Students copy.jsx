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

const Students = () => {
  const [gridKey, setGridKey] = useState(0);
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    phone: "",
    email: "",
    git: "",
    linkedIn: "",
    selectedTrainer: "",
    selectedBranch: "",
    selectedCourse: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const delay = 500; // 500ms debounce delay

    const debounceSearch = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, delay);

    return () => clearTimeout(debounceSearch);
  }, [searchTerm]);

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
      git,
      linkedIn,
      selectedTrainer,
      selectedBranch,
      selectedCourse,
    } = newStudent;

    if (
      name &&
      phone &&
      email &&
      git &&
      linkedIn &&
      selectedTrainer &&
      selectedBranch &&
      selectedCourse
    ) {
      const newStudentData = {
        name,
        phone,
        email,
        git,
        linkedIn,
        selectedTrainer,
        selectedBranch,
        selectedCourse,
        id: students.length + 1,
      };

      const updatedStudents = [...students, newStudentData];
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
      });
      setEditingIndex(null);
    } else {
      alert("Please fill all the fields.");
    }
  };

  const handleUpdateStudent = () => {
    const updatedStudents = students.map((student, index) => {
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
    });
    setEditingIndex(null);
  };

  const handleEditRow = (student) => {
    setNewStudent({ ...student });
    setEditingIndex(students.indexOf(student));
  };

  const handleViewRow = (student) => {
    setSelectedStudent(student);
    setIsModalVisible(true);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };


const gridColumns = [
  { field: "name", headerText: "Name", width: 100 },
  { field: "phone", headerText: "Phone", width: 100 },
  { field: "email", headerText: "Email", width: 100 },
  { field: "git", headerText: "Git", width: 100 },
  { field: "linkedIn", headerText: "LinkedIn", width: 100 },
  { field: "selectedTrainer", headerText: "Trainer", width: 100 },
  { field: "selectedBranch", headerText: "Branch", width: 100 },
  { field: "selectedCourse", headerText: "Course", width: 100 },
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



  const filteredStudents = debouncedSearchTerm
    ? students.filter((student) =>
        student.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    : students;

  const gridData = filteredStudents.map((student, index) => ({
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
          <div className="flex flex-wrap mb-4">
            <input
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="Name"
              name="name"
              value={newStudent.name}
              onChange={handleInputChange}
            />
            <input
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="Phone"
              name="phone"
              value={newStudent.phone}
              onChange={handleInputChange}
            />
            <input
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="Email"
              name="email"
              value={newStudent.email}
              onChange={handleInputChange}
            />
            <input
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="Git"
              name="git"
              value={newStudent.git}
              onChange={handleInputChange}
            />
            <input
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="LinkedIn"
              name="linkedIn"
              value={newStudent.linkedIn}
              onChange={handleInputChange}
            />
            <select
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              name="selectedTrainer"
              value={newStudent.selectedTrainer}
              onChange={handleInputChange}
            >
              <option value="">Select Trainer</option>
              <option value="Trainer 1">Trainer 1</option>
              <option value="Trainer 2">Trainer 2</option>
              {/* Add more options for trainers */}
            </select>
            <select
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              name="selectedBranch"
              value={newStudent.selectedBranch}
              onChange={handleInputChange}
            >
              <option value="">Select Branch</option>
              <option value="Branch 1">Branch 1</option>
              <option value="Branch 2">Branch 2</option>
              {/* Add more options for branches */}
            </select>
            <select
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              name="selectedCourse"
              value={newStudent.selectedCourse}
              onChange={handleInputChange}
            >
              <option value="">Select Course</option>
              <option value="Course 1">Course 1</option>
              <option value="Course 2">Course 2</option>
              {/* Add more options for courses */}
            </select>
          </div>
          </div>

          {editingIndex !== null ? (
            <button
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-700"
              onClick={handleUpdateStudent}
            >
              Update Student
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
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
              const selectedStudent = filteredStudents[args.rowIndex];
              setSelectedStudent(selectedStudent);
              setIsModalVisible(true);
            }
          }}
        >
          {gridColumns.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
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
import React, { useEffect, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";
import { Header } from "../Components";
import CourseDetailsModal from "./CourseDetailsModal"; // Assuming you have a modal component for displaying course details
import {
  addcourse,
  updateCourse,
  deleteCourse,
  getCourse,
} from "../service/apiService";

const Courses = () => {
  const [gridKey, setGridKey] = useState(0);
  const [courses, setCourses] = useState([]);

  const [newCourse, setNewCourse] = useState({
    name: "",
    syllabusFile: null,
    courseMaterialFile: null,
  });
  const [editingIndex, setEditingIndex] = useState(null);

  // Function to fetch courses and update the state
  const fetchCourses = async () => {
    try {
      const coursesData = await getCourse();
      setCourses(coursesData);
    } catch (error) {
      console.error("Failed to fetch courses: ", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({
      ...newCourse,
      [name]: value,
    });
  };

  const handleFileInputChange = (e) => {
    const { name, files } = e.target;
    setNewCourse({
      ...newCourse,
      [name]: files[0],
    });
  };

  const handleAddCourse = () => {
    const { name } = newCourse;
    addcourse(newCourse);

    if (name) {
      // Assuming you want to store the course data with files in state
      const newCourseData = {
        name,
        // syllabusFile,
        // courseMaterialFile,
        id: courses.length + 1,
      };

      const updatedCourses = [...courses, newCourseData];
      setCourses(updatedCourses);
      setGridKey((prevKey) => prevKey + 1);
      setNewCourse({
        name: "",
        syllabusFile: null,
        courseMaterialFile: null,
      });
      setEditingIndex(null);
    } else {
      alert("Please fill all the fields.");
    }
  };

  const handleUpdateCourse = async () => {
    try {
      await updateCourse(newCourse.id, newCourse); // Assuming newCourse has an 'id' property
      const updatedCourses = courses.map((course) =>
        course.id === newCourse.id ? { ...course, ...newCourse } : course
      );
      setCourses(updatedCourses);
      setGridKey((prevKey) => prevKey + 1);
      setNewCourse({
        name: "",
        syllabusFile: null,
        courseMaterialFile: null,
      });
      setEditingIndex(null);
    } catch (error) {
      console.error("Failed to update course: ", error.message);
    }
  };

  const handleEditRow = (course) => {
    setNewCourse({ ...course });
    setEditingIndex(courses.indexOf(course));
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await deleteCourse(courseId);
      const updatedCourses = courses.filter((course) => course.id !== courseId);
      setCourses(updatedCourses);
      setGridKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Failed to delete course: ", error.message);
    }
  };

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleViewRow = (course) => {
    setSelectedCourse(course);
    setIsModalVisible(true);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const gridColumns = [
    { field: "name", headerText: "Course Name", width: 200 },
    { field: "syllabusFile", headerText: "Syllabus File", width: 200 },
    {
      field: "courseMaterialFile",
      headerText: "Course Material File",
      width: 200,
    },
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
            <button
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 ml-2"
              onClick={() => handleDeleteCourse(rowdata.id)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const gridData = courses.map((course, index) => ({
    ...course,
    id: index + 1,
  }));

  return (
    <div className="container mx-auto p-10 bg-white rounded-3xl">
      <Header category="Page" title="Courses" />

      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Course Management</h1>

        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Add Course</h2>
          <div className="flex flex-wrap mb-4">
            <input
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="Course Name"
              name="name"
              value={newCourse.name}
              onChange={handleInputChange}
            />
            <input
              type="file"
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              name="syllabusFile"
              onChange={handleFileInputChange}
            />
            <input
              type="file"
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              name="courseMaterialFile"
              onChange={handleFileInputChange}
            />
          </div>

          {editingIndex !== null ? (
            <button
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-700"
              onClick={handleUpdateCourse}
            >
              Update Course
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
              onClick={handleAddCourse}
            >
              Add Course
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
              const selectedCourse = courses[args.rowIndex];
              setSelectedCourse(selectedCourse);
              setIsModalVisible(true);
            }
          }}
        >
          <ColumnsDirective>
            {gridColumns.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Page, Toolbar, Edit, Sort, Filter]} />
        </GridComponent>

        {selectedCourse && (
          <CourseDetailsModal
            selectedCourse={selectedCourse}
            toggleModal={toggleModal}
          />
        )}
      </div>
    </div>
  );
};

export default Courses;

import React, { useEffect, useState } from "react";
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
} from "@material-ui/core";
import { AiFillDelete } from "react-icons/ai";
import { errorToastify, successToastify } from "../Components/Student/toastify";

import { Header } from "../Components";
import CourseDetailsModal from "./CourseDetailsModal"; // Assuming you have a modal component for displaying course details
import {
  addcourse,
  updateCourse,
  deleteCourse,
  getCourse,
  addSubcourse,
  getSubcourse,
} from "../service/apiService";


const Courses = () => {

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [refresh, setRefresh] = useState(false);
  const [courses, setCourses] = useState([]);
  const [subcourse, setSubcourse] = useState([]);
  // ------------------
  const [courseForAdding, setCourseForAdding] = useState([]);
  const [data, setdata] = useState([]);
  const tableHeaders = ["Name", "Created date", "Updated date", "Action"];
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = courses.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(courses.length / rowsPerPage);
  
  
  const handledelete=async(id)=>{

   try {
    const response = await deleteCourse(id)
    setRefresh(!refresh)

    successToastify(response.message);
  } catch (error) {
    console.log(error,'--err');
    errorToastify(error?.message);
  }
  

}
  

  const [gridKey, setGridKey] = useState(0);

  const [newCourse, setNewCourse] = useState({ name: "",});
  const [editingIndex, setEditingIndex] = useState(null);
console.log(newCourse,'-courseee by typing');
  // Function to fetch courses and update the state
  const fetchDetails = async () => {
    try {
      const coursesData = await getCourse();
      console.log(coursesData.result,'twr');      
      const subcoursesData = await getSubcourse();
      setSubcourse(subcoursesData.result)
      setCourses(coursesData.result);
    } catch (error) {
      console.error("Failed to fetch courses: ", error.message);
    }
  };

  console.log(courses,"asdfg");




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

  const handleAddCourse = async(e) => {



   try{
    const response = await addSubcourse(newCourse,courseForAdding);
    successToastify('Created subcourse')
    setRefresh(!refresh)
   }catch(err){
    errorToastify(err.message)
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
    fetchDetails();
  }, [refresh]);

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

  // const gridData = courses.map((course, index) => ({
  //   ...course,
  //   id: index + 1,
  // }));

  return (
    <div className="container mx-auto p-10 bg-white rounded-3xl">
      <Header category="Page" title="SubCourse" />

      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">SubCourse Management</h1>

        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Add SubCourse</h2>
          <div className="flex flex-wrap mb-4">
          <select
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              value={courseForAdding}
              onChange={(e) => setCourseForAdding(e.target.value)}
            >
              <option value="" disabled>
                Select Course
              </option>
              {courses.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
            <input
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="SubCourse Name"
              name="name"
              value={newCourse.name}
              onChange={handleInputChange}
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
              Add Subcourse
            </button>
          )}
        </div>


        <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="h-fit">
                  {tableHeaders?.map((header, index) => (
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
                {subcourse.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.createdAt}</TableCell>
                    <TableCell>{item.updatedAt}</TableCell>
                    <TableCell>
                    
                        <IconButton
                          size="small"
                          title="Delete"
                          onClick={() => handledelete(item._id)}
                        >
                          <AiFillDelete size={25}/>
                        </IconButton>
                    
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

       

        {/* {selectedCourse && (
          <CourseDetailsModal
            selectedCourse={selectedCourse}
            toggleModal={toggleModal}
          />
        )} */}
      </div>
    </div>
  );
};

export default Courses;

import React, { useEffect, useState } from 'react'
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
} from '@material-ui/core'
import { AiFillDelete } from 'react-icons/ai'
import { errorToastify, successToastify } from '../Components/Student/toastify'

import { Header } from '../Components'
import { addcourse, deleteCourse, getCourse } from '../service/apiService'
import Loader from '../Components/Loader'

const Courses = () => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  // loader
  const [loader, setLoader] = useState(false)
  // --------------
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage] = useState(10)
  const [refresh, setRefresh] = useState(false)
  const [courses, setCourses] = useState([])
  const tableHeaders = [
    'Name',
    'Created date',
    'Updated date',
    'Details',
    'Delete',
  ]
  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentData = courses.slice(indexOfFirstRow, indexOfLastRow)
  const totalPages = Math.ceil(courses.length / rowsPerPage)

  // add course
  const handledelete = async (id) => {
    try {
      const response = await deleteCourse(id)
      setRefresh(!refresh)

      successToastify(response.message)
    } catch (error) {
      console.log(error, '--err')
      errorToastify(error?.message)
    }
  }
  //  -------------------

  const [gridKey, setGridKey] = useState(0)

  const [newCourse, setNewCourse] = useState({
    name: null,
    details: null,
  })
  const [editingIndex, setEditingIndex] = useState(null)

  // Function to fetch courses and update the state
  const fetchCourses = async () => {
    setLoader(true)
    try {
      const coursesData = await getCourse()
      setCourses(coursesData.result)
      setLoader(false)
    } catch (error) {
      setLoader(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewCourse({
      ...newCourse,
      [name]: value,
    })
  }

  // add course
  const handleAddCourse = async (e) => {
    e.preventDefault()
    setLoader(true)
    try {
      await addcourse(newCourse)
      setRefresh(!refresh)
      successToastify('Created course')
      setLoader(false)
    } catch (err) {
      errorToastify(err.message)
      setLoader(false)
    }
  }
  // -------

  const handleEditRow = (course) => {
    setNewCourse({ ...course })
    setEditingIndex(courses.indexOf(course))
  }

  const handleDeleteCourse = async (courseId) => {
    setLoader(true)
    try {
      await deleteCourse(courseId)
      const updatedCourses = courses.filter((course) => course.id !== courseId)
      setCourses(updatedCourses)
      setGridKey((prevKey) => prevKey + 1)
      setLoader(false)
    } catch (error) {
      setLoader(false)
      errorToastify(error.message)
    }
  }

  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleViewRow = (course) => {
    setSelectedCourse(course)
    setIsModalVisible(true)
  }

  useEffect(() => {
    setLoader(true)
    fetchCourses()
  }, [refresh])

  const UiForAddingBranch = (
    <>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Add Course</h2>
        <form onSubmit={handleAddCourse}>
          <div className="flex flex-wrap mb-4">
            <input
              required
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="Course Name"
              name="name"
              value={newCourse.name}
              onChange={handleInputChange}
            />
            <input
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="Details"
              name="details"
              value={newCourse.details}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Add Course
          </button>
        </form>
      </div>
    </>
  )

  const UiForViewData = currentData.map((student) => (
    <TableRow key={student._id}>
      <TableCell>{student.name}</TableCell>
      <TableCell>
        {new Date(student.createdAt).toLocaleDateString('en-GB')}
      </TableCell>
      <TableCell>{student.updatedAt}</TableCell>
      <TableCell>{student.details || '-'}</TableCell>
      <TableCell>
        <IconButton
          size="small"
          title="Delete"
          onClick={() => handledelete(student._id)}
        >
          <AiFillDelete size={25} />
        </IconButton>
      </TableCell>
    </TableRow>
  ))

  return (
    <div className="container mx-auto p-10 bg-white rounded-3xl">
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header category="Page" title="Courses" />

          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4">Course Management</h1>

            {UiForAddingBranch}

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow className="h-fit">
                    {tableHeaders?.map((header, index) => (
                      <TableCell
                        key={index}
                        style={{
                          backgroundColor: '#475569',
                          fontSize: '17px',
                          color: 'white',
                        }}
                      >
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody className="text-lg">{UiForViewData}</TableBody>
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
        </>
      )}
    </div>
  )
}

export default Courses

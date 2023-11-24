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
import {
  updateCourse,
  deleteCourse,
  getCourse,
  addSubcourse,
  getSubcourse,
} from '../service/apiService'
import Loader from '../Components/Loader'

const Courses = () => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage] = useState(10)
  const [refresh, setRefresh] = useState(false)
  const [courses, setCourses] = useState([])
  const [subcourse, setSubcourse] = useState([])
  const [loader, setLoader] = useState(false)

  // ------------------
  const [courseForAdding, setCourseForAdding] = useState([])
  const tableHeaders = ['Name','Day by day syllabus','Course Materials', 'Created date', 'Updated date', 'Delete']
  const totalPages = Math.ceil(courses.length / rowsPerPage)

  const handledelete = async (id) => {
    setLoader(true)
    try {
      const response = await deleteCourse(id)
      setRefresh(!refresh)
      setLoader(false)

      successToastify(response.message)
    } catch (error) {
      setLoader(false)
      errorToastify(error?.message)
    }
  }

  const [gridKey, setGridKey] = useState(0)

  const [newCourse, setNewCourse] = useState({ name: null,syllabus:null,details:null })
  const [editingIndex, setEditingIndex] = useState(null)
  console.log(newCourse, '-courseee by typing')
  // Function to fetch courses and update the state
  const fetchDetails = async () => {
    setLoader(true)
    try {
      const coursesData = await getCourse()
      setCourses(coursesData.result)
      const subcoursesData = await getSubcourse()
      setSubcourse(subcoursesData.result)
      setLoader(false)
    } catch (error) {
      setLoader(false)
    }
  }

  console.log(courses, 'asdfg')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewCourse({
      ...newCourse,
      [name]: value,
    })
  }

  const handleAddCourse = async (e) => {
    e.preventDefault()
    setLoader(true)
    try {
      await addSubcourse(newCourse, courseForAdding)
      successToastify('Created subcourse')
      setRefresh(!refresh)
      setLoader(false)
    } catch (err) {
      setLoader(false)

      errorToastify(err.message)
    }
  }

  const handleUpdateCourse = async () => {
    try {
      await updateCourse(newCourse.id, newCourse) // Assuming newCourse has an 'id' property
      const updatedCourses = courses.map((course) =>
        course.id === newCourse.id ? { ...course, ...newCourse } : course
      )
      setCourses(updatedCourses)
      setGridKey((prevKey) => prevKey + 1)
      setNewCourse({
        name: '',
        syllabusFile: null,
        courseMaterialFile: null,
      })
      setEditingIndex(null)
    } catch (error) {
      console.error('Failed to update course: ', error.message)
    }
  }

  useEffect(() => {
    setLoader(true)
    fetchDetails()
  }, [refresh])

  // }));

  return (
    <div className="container mx-auto p-10 bg-white rounded-3xl">
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header category="Page" title="SubCourse" />

          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4">SubCourse Management</h1>
            <form onSubmit={handleAddCourse}>
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Add SubCourse</h2>
                <div className="flex flex-wrap mb-4">
                  <select
                    required
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
                    required
                    className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
                    type="text"
                    placeholder="SubCourse Name"
                    name="name"
                    value={newCourse.name}
                    onChange={handleInputChange}
                  />

                  <input
                    required
                    className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
                    type="text"
                    placeholder="Day by bay syllabus"
                    name="details"
                    value={newCourse.details}
                    onChange={handleInputChange}
                  />

                  <input
                    required
                    className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
                    type="text"
                    placeholder="Course metrials"
                    name="syllabus"
                    value={newCourse.syllabus}
                    onChange={handleInputChange}
                  />
                </div>

                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
                  type="submit"
                >
                  Add Subcourse
                </button>
              </div>
            </form>

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
                <TableBody className="text-lg">
                  {subcourse.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.details}</TableCell>
                      <TableCell>{item.syllabus}</TableCell>
                      <TableCell>
                        {new Date(item.createdAt).toLocaleDateString('en-GB')}
                      </TableCell>
                      <TableCell>
                        {new Date(item.updatedAt).toLocaleDateString('en-GB')}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          title="Delete"
                          onClick={() => handledelete(item._id)}
                        >
                          <AiFillDelete size={25} />
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
          </div>
        </>
      )}
    </div>
  )
}

export default Courses

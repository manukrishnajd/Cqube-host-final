import React, { useState } from 'react'
import FileBase64 from 'react-filebase64'
import { Header } from '../Components'
import { useEffect } from 'react'
import {
  addTrainer,
  getCourse,
  getAllTrainers,
  getAllBranches,
  trainerdetailupdate,
  trainerdetaildelete,
} from '../service/apiService'
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
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { errorToastify, successToastify } from '../Components/Student/toastify'
import { trainerdetail } from '../service/trainerService'
import { toast } from 'react-toastify'
import Loader from '../Components/Loader'

const Trainers = () => {
  const [name, setName] = useState('')
  const [phoneNumber, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [branchRef, setBranch] = useState('')
  const [courseRef, setCourse] = useState('')
  const [gridData, setGridData] = useState()
  const [joinedDate, setJoinedDate] = useState()
  const [image, setimage] = useState()
  const [git, setgit] = useState()
  const [loading, setLoading] = useState(false)
  const [linkedin, setlinkedin] = useState()

  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage] = useState(10)

  const [refresh, setrefresh] = useState(false)

  //
  const [viewBranch, setviewBranch] = useState([])
  const [viewCourse, setviewCourse] = useState([])
  const [trainerdata, settrainerdata] = useState([])
  let [updateddata, setupdateddata] = useState()

  const [data, setdata] = useState([])
  const tableHeaders = [
    'Profile Pic',
    'Name',
    'Email',
    'Branch',
    'Phone',
    'Linkedin',
    'Github',
    'Course',
    'Created date',
    'Updated date',
    'Action',
    ' '
  ]
  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentData = trainerdata.slice(indexOfFirstRow, indexOfLastRow)
  const totalPages = Math.ceil(trainerdata.length / rowsPerPage)

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  // branches

  const [getBranch, setGetBranch] = useState([])
  const [view, setview] = useState(false)
  const [editviewdata, seteditviewdata] = useState({})

  const handleedit = async (id) => {
    setLoading(true)
    trainerdetail(id).then((res) => {
      seteditviewdata(res)
      setupdateddata(res)
      setview(!view)
      setLoading(false)
    })
  }

  const handleAddTrainer = async () => {
    setLoading(true)
    try {
      const newTrainer = {
        name,
        password,
        phoneNumber,
        email,
        branchRef,
        joinedDate,
        courseRef: selectedcourse,
        profilePic: image,
        github: git,
        linkedin,
      }

      await addTrainer(newTrainer)

      setGridData(data)
      clearFields()
      setrefresh(!refresh)
      setLoading(false)
      successToastify('Trainer created')
    } catch (error) {
      errorToastify(error?.message)
      setLoading(false)
    }
  }

  const clearFields = () => {
    setName('')
    setPhone('')
    setEmail('')
    setBranch('')
    setCourse('')
  }
  const [selectedcourse, setselectcourse] = useState([])

  const gridColumns = [
    { field: 'name', headerText: 'Name', width: 100 },
    { field: 'phone', headerText: 'Phone', width: 100 },
    { field: 'email', headerText: 'Email', width: 100 },
    { field: 'branch', headerText: 'Branch', width: 100 },
    { field: 'course', headerText: 'Course', width: 100 },
  ]
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await getAllBranches()
      console.log(response, 'rrr')
      setviewBranch(response)
      const responseForCourse = await getCourse()
      console.log(response, 'rcccrr')
      setviewCourse(responseForCourse.result)
      const trainersdata = await getAllTrainers()
      settrainerdata(trainersdata)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)

    fetchData()
  }, [refresh])

  const fetchAllDetails = async () => {
    try {
      const result = await getAllBranches()

      setGetBranch(result)
    } catch (error) {}
  }

  const [course_data, setCourseData] = useState([])

  useEffect(() => {
    setLoading(true)

    getCourse()
      .then((res) => {
        setLoading(false)
        setCourseData(res)
      })
      .catch(() => {
        setLoading(false)
      })

    // getAllTrainers()

    fetchAllDetails()
  }, [])

  // console.log(data._id, "datas");

  const handledelete = async (id) => {
    try {
      await trainerdetaildelete(id)
      successToastify('deleted succesffully')
      setrefresh(!refresh)
    } catch (error) {
      setrefresh(!refresh)
      errorToastify(error?.message)
    }
  }

  const handleUpdate = (id) => {
    // Update the fields with the new values if they are not empty

    if (selectedcourse) {
      updateddata = { ...updateddata, courseRef: selectedcourse }
    }
    console.log(updateddata, 'vbnm')

    if (image) {
      updateddata = { ...updateddata, profilePic: image }
    }
    // Similar logic for trainer and branch references

    // Update the student with the modified data
    trainerdetailupdate(id, updateddata).then((res) => {
      console.log(res, 'update response')
      setrefresh(!refresh)
      setview(!view)
    })
  }

  const handleUpdateInputChange = (e) => {
    setupdateddata({ ...updateddata, [e.target.name]: e.target.value })
  }

  const handleupdateCourseChange = (e) => {
    const selectedCourseData = e.target.value // Parse the selected course data
    console.log(selectedCourseData, 'datas')
    setupdateddata({
      ...updateddata,
      courseRef: selectedCourseData,
    })
  }

  const handleSelectTrainer = (e, trainerId) => {
    if (e.target.checked) {
      setselectcourse((prevSelectedTrainers) => [
        ...prevSelectedTrainers,
        trainerId,
      ])
    } else {
      setselectcourse((prevSelectedTrainers) =>
        prevSelectedTrainers.filter((id) => id !== trainerId)
      )
    }
  }

  return (
    <div className="container mx-auto p-10 bg-white rounded-3xl">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header category="Page" title="Trainers" />
          <div className="mb-8">
            <div className=" flex justify-between">
              <h1 className="text-2xl font-bold mb-4">
                Trainer Profile Management
              </h1>
              {image && <img src={image} width={300} />}
            </div>

            {!view && (
              <div className="mb-4">
                <form onSubmit={handleAddTrainer}>
                  <h2 className="text-xl font-bold mb-2">Add Trainer</h2>
                  <div className="flex  p-5 border rounded flex-wrap mb-4 gap-2">
                    <input
                      required
                      className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <FileBase64
                      onDone={(res) => {
                        console.log(res.base64, 'responsesd')
                        setimage(res.base64)
                      }}
                    />
                    <input
                      required
                      className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
                      type="number"
                      placeholder="Phone"
                      value={phoneNumber}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <input
                      required
                      className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      required
                      className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <input
                      required
                      className="border h-9 rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
                      type="date"
                      placeholder="date"
                      value={joinedDate}
                      onChange={(e) => setJoinedDate(e.target.value)}
                    />
                    <input
                      className="border h-9 rounded p-2 mr-2 mb-2 sm:mb-0"
                      type="text"
                      placeholder="Git"
                      value={git}
                      onChange={(e) => setgit(e.target.value)}
                    />
                    <input
                      className="border h-9 rounded p-2 mr-2 mb-2 sm:mb-0"
                      type="text"
                      placeholder="Linkedin"
                      value={linkedin}
                      onChange={(e) => setlinkedin(e.target.value)}
                    />

                    <select
                      required
                      className="border h-9 rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
                      value={branchRef}
                      onChange={(e) => setBranch(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Branch
                      </option>
                      {viewBranch.map((item, index) => (
                        <>
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        </>
                      ))}
                    </select>

                    <div className="flex-col">
                      <label htmlFor="">Course:</label>
                      <div className="overflow-y-scroll h-24 ">
                        {viewCourse?.map((trainer) => (
                          <div key={trainer._id}>
                            <label>
                              <input
                                type="checkbox"
                                value={trainer._id}
                                checked={selectedcourse.includes(trainer._id)}
                                onChange={(e) =>
                                  handleSelectTrainer(e, trainer._id)
                                }
                              />
                              {trainer.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
                  >
                    Add Trainer
                  </button>
                </form>
              </div>
            )}

            {view && (
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Update Trainer</h2>
                <form
                  action=""
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleUpdate(editviewdata._id)
                  }}
                >
                  <div className="flex flex-wrap mb-4">
                    <input
                      className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
                      type="text"
                      name="name"
                      placeholder={`Name`}
                      value={updateddata?.name}
                      onChange={handleUpdateInputChange}
                    />
                    <input
                      className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
                      type="text"
                      name="phoneNumber"
                      value={updateddata?.phoneNumber}
                      placeholder={`Phone`}
                      onChange={handleUpdateInputChange}
                    />
                    <input
                      className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
                      type="text"
                      name="email"
                      value={updateddata?.email}
                      placeholder={`Email:`}
                      onChange={handleUpdateInputChange}
                    />
                    <input
                      className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
                      type="password"
                      placeholder={`Password`}
                      name="password"
                      onChange={handleUpdateInputChange}
                    />
                    <label htmlFor="">
                      {/* {`Date joined: ${updateddata.joinedDate}`} */}
                      <span>Joined Date : </span> {new Date(updateddata.joinedDate).toLocaleDateString('en-GB')}
                    </label>
                    {/* <input type="date" value={editviewdata.joinedDate} /> */}
                    <FileBase64
                      onDone={(res) => {
                        console.log(res.base64, 'responsesd')
                        setimage(res.base64)
                      }}
                    />
                    <input
                      className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
                      type="date"
                      placeholder="date"
                      name="joinedDate"
                      onChange={handleUpdateInputChange}
                    />
                    <select
                      className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
                      name="branchRef"
                      onChange={handleUpdateInputChange}
                    >
                      <option value="" disabled>
                        {editviewdata.BranchName}
                      </option>
                      {viewBranch?.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <label>Courses:</label>
                    {editviewdata?.courseRef.map((course) => (
                      <>
                        <option key={course._id} value={course._id}>
                          {course.name}
                        </option>
                      </>
                    ))}
                    <div className="flex-col">
                      <label htmlFor="">Course:</label>
                      <div className="overflow-y-scroll h-24 ">
                        {viewCourse?.map((trainer) => (
                          <div key={trainer._id}>
                            <label>
                              <input
                                type="checkbox"
                                value={trainer._id}
                                checked={selectedcourse.includes(trainer._id)}
                                onChange={(e) =>
                                  handleSelectTrainer(e, trainer._id)
                                }
                              />
                              {trainer.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 hover:shadow-orange"
                  >
                    Update Trainer
                  </button>
                </form>
              </div>
            )}

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
                  {currentData.map((student) => (
                    <TableRow key={student._id}>
                      <TableCell>
                        <img
                          src={student.profilePic}
                          className="max-w-none profile"
                          alt=""
                        />
                      </TableCell>

                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      
                      <TableCell>{student.branchName}</TableCell>
                      <TableCell>{student.phoneNumber}</TableCell>
                      <TableCell>{student.linkedin}</TableCell>
                      <TableCell>{student.github}</TableCell>

                      <TableCell>
                        {student.courses.map((item) => (
                          <li className="list-none">{item.courseName}</li>
                        ))}
                      </TableCell>
                      <TableCell>
                        {new Date(student.createdAt).toLocaleDateString(
                          'en-GB'
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(student.updatedAt).toLocaleDateString(
                          'en-GB'
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          title="Delete"
                          onClick={() => handledelete(student._id)}
                        >
                          <AiFillDelete size={25} />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          title="View more"
                          onClick={() => handleedit(student._id)}
                        >
                          <AiFillEdit size={25} />
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

export default Trainers

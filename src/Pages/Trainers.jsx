import React, { useState } from "react";

import { Header } from "../Components";
import { useEffect } from "react";
import { addTrainer, viewbranch ,getCourse, getAllTrainers, updateTrainer, getAllBranches } from "../service/apiService";
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
import { errorToastify } from "../Components/Student/toastify";


const Trainers = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [branchRef, setBranch] = useState("");
  const [courseRef, setCourse] = useState("");
  const [gridData, setGridData] = useState();
  const [joinedDate, setJoinedDate] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);


//
const [viewBranch, setviewBranch] = useState([]);
const [viewCourse, setviewCourse] = useState([]);
  const [trainerdata,settrainerdata]=useState([])


  const [data, setdata] = useState([]);
  const tableHeaders = ["Name", "Created date", "Updated date", "Action"];
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = trainerdata.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(trainerdata.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // branches

  const [getBranch, setGetBranch] = useState([]);


  const handleAddTrainer = () => {
    const newTrainer = {
      name,
      password,
      phoneNumber,
      email,
      branchRef,
      joinedDate,
      courseRef,
    };

    addTrainer(newTrainer);

    setGridData(data);
    clearFields();
  };

  const clearFields = () => {
    setName("");
    setPhone("");
    setEmail("");
    setBranch("");
    setCourse("");
  };

  const gridColumns = [
    { field: "name", headerText: "Name", width: 100 },
    { field: "phone", headerText: "Phone", width: 100 },
    { field: "email", headerText: "Email", width: 100 },
    { field: "branch", headerText: "Branch", width: 100 },
    { field: "course", headerText: "Course", width: 100 },
  ];
  const fetchData = async () => {
    try {
      const response = await getAllBranches();
      const responseForCourse = await getCourse();
      const trainersdata= await getAllTrainers()
      console.log(trainersdata,'trainerdata');
      settrainerdata(trainersdata)
      setviewBranch(response);
      setviewCourse(responseForCourse.result)

    } catch (error) {
      errorToastify(error?.message);
    }
  };

  useEffect(() => {
    fetchData();

  }, []);

  const fetchAllDetails = async () => {
    try {
      const result = await getAllBranches();

      setGetBranch(result);
    } catch (error) {}
  };

  const [course_data, setCourseData] = useState([]);

  useEffect(() => {
    getCourse().then((res) => {
      setCourseData(res);
    });
    // getAllTrainers()

    fetchAllDetails();
  }, []);

  // console.log(data._id, "datas");


  const handledelete=async(id)=>{
    // window.location.reload()
    
    
  
  }


  return (
    <div className="container mx-auto p-10 bg-white rounded-3xl">
      <Header category="Page" title="Trainers" />

      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Trainer Profile Management</h1>

        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Add Trainer</h2>
          <div className="flex flex-wrap mb-4">
            <input
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="Phone"
              value={phoneNumber}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              type="date"
              placeholder="date"
              value={joinedDate}
              onChange={(e) => setJoinedDate(e.target.value)}
            />
            <select
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              value={branchRef}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option value="" disabled>
                Select Branch
              </option>
              {viewBranch?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>

            <select
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              value={courseRef}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="" disabled>
                Select Course
              </option>
              {
                viewCourse?.map((item)=>{
                  return(
                    <>
                      <option key={item?._id}   value={item?._id}>{item?.name}</option>
                    </>
                  )
                })
              }
              {/* <option value="Course 2">Course 2</option> */}
            </select>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
            onClick={handleAddTrainer}
          >
            Add Trainer
          </button>
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
                {currentData.map((student) => (
                  <TableRow key={student._id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.createdAt}</TableCell>
                    <TableCell>{student.updatedAt}</TableCell>
                    <TableCell>
                    
                        <IconButton
                          size="small"
                          title="Delete"
                          onClick={() => handledelete(student._id)}
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

       
      </div>
    </div>
  );
};

export default Trainers;

import React, { useState } from "react";
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
import { useEffect } from "react";
import {
  createBranch,
  deleteBranch,
  getAllBranches,
} from "../service/apiService";
import { errorToastify, successToastify } from "../Components/Student/toastify";
import { AiFillDelete } from "react-icons/ai";
import Loader from "../Components/Loader";
import "./Loader.css"; // Import the CSS file for the loader

const Trainers = () => {
  const [name, setName] = useState("");
  //reuse
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [loader, setLoader] = useState(false);
  //loader state
  const [data, setdata] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // add branch function
  const handleBranch = async () => {
    setLoader(true);

  
    try {
      await createBranch(name);
      successToastify("Create branch");
      setLoader(false);
    } catch (error) {
      errorToastify(error?.message);
      setLoader(false);
    }
    getBranches();
  };
  //  ------------------------

  // get all branches
  const getBranches = async () => {
    setLoader(true);
    try {
      const response = await getAllBranches();
      setdata(response);
      setLoader(false);
    } catch (error) {
      errorToastify(error?.message);
      setLoader(false);
    }
  };
  // ------------------------

  useEffect(() => {
    setLoader(true)
    getBranches();
  }, [refresh]);

  // delete branch by id
  const handledelete = async (id) => {
    setLoader(true);
    try {
      const response = await deleteBranch(id);
      setRefresh(!refresh);
      setLoader(false);
      successToastify(response.message);
    } catch (error) {
      errorToastify(error?.message);
      setLoader(false);
    }
  };
  //  -----------------------------

  const tableHeaders = ["Name", "Created date", "Updated date", "Delete"];

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const UiForAddingBranch = (
    <>
      <div className="mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Add Branch</h2>
          <div className="flex flex-wrap mb-4">
            <input
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
            onClick={handleBranch}
          >
            Add Branch
          </button>
        </div>
      </div>
    </>
  );

  const UiForViewData = currentData.map((student) => {
    const createdAtDate = new Date(student.createdAt);
    console.log(createdAtDate.getFullYear(),'-yyyy')
    console.log(createdAtDate.getDate(),'-day  ')
    console.log(createdAtDate.getMonth(),'-yyyy')
    const updatedAtDate = new Date(student.updatedAt);
    console.log(updatedAtDate.getFullYear(),'-yyyy')
    console.log(updatedAtDate.getDate(),'-day  ')
    console.log(updatedAtDate.getMonth(),'-yyyy')
  
    return (
       <TableRow key={student._id}>
        <TableCell>{student.name}</TableCell>
        <TableCell>{`${createdAtDate.getDate()} / ${createdAtDate.getMonth()} / ${createdAtDate.getFullYear()}  `}</TableCell>
        <TableCell>{`${createdAtDate.getDate()} / ${createdAtDate.getMonth()} / ${createdAtDate.getFullYear()}  `}</TableCell>
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
    );
  });
  
  return (
    <>{
      loader ?
     <div className="w-full m-auto mt-52 hh">
      
      <Loader  />
     </div>
     
      :
      
      
    
    <div className="container mx-auto p-10 bg-white rounded-3xl">

     
      {UiForAddingBranch}

     
     

      <div className="container mx-auto p-3 text-white rounded-3xl">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl text-black font-bold mb-4">Branches</h1>

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
                {UiForViewData}
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
    </div>
    
      
  }
    </>

  );
};

export default Trainers;

// import React, { useEffect, useState } from "react";
// import { addbranch, deleteBranch, getBranch } from "../service/apiService";

// const Branch = () => {
//   const [branch, setBranch] = useState({ name: "" });
//   const [createdBranch, setCreatedBranch] = useState(null);
//   const [error, setError] = useState(false);
//   const [message, setMessage] = useState("");
//   const [branches, setBranches] = useState([]);
//   const [callUseEffect,setCallUseEffect] = useState(false)

//   const handleChange = (event) => {
//     setBranch({ ...branch, [event.target.name]: event.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addbranch(branch)
//       .then((response) => {
//         if (response.success) {
//           setError(!response?.success);
//           setCreatedBranch(response.result);
//           setCallUseEffect(!callUseEffect)
//           setMessage("");
//         } else {
//           setError(!response?.success);
//           setCreatedBranch(null);
//           setMessage(response.message);
//         }
//       })
//       .catch((error) => {
//         setError(!error?.success);
//         setMessage(error?.message);
//       });
//   };

//   const handleDelete = (id) => {
//     deleteBranch(id)
//       .then((response) => {
//         setCallUseEffect(!callUseEffect)
//       })
//       .catch((error) => {
//         setError(!error?.success);
//         setMessage(error?.message);
//       });
//   };

//   useEffect(() => {
//     getBranch(1)
//       .then((response) => {
//         console.log(response);
//         setBranches(response.result);
//       })
//       .catch((error) => {
//         setError(!error?.success);
//         setMessage(error?.message);
//       });
//   }, [callUseEffect]);

//   return (
//     <div className="flex flex-col items-center m-4">
//       <div className="bg-slate-600 shadow-lg p-6 rounded-lg mb-4 w-full max-w-xl">
//         <form onSubmit={handleSubmit} className="flex">
//           <input
//             type="text"
//             placeholder="Branch"
//             name="name"
//             value={branch.name}
//             onChange={handleChange}
//             className="border border-slate-600 p-2 rounded-l w-full focus:outline-none"
//           />
//           <button
//             type="submit"
//             className="bg-orange-400 text-white p-2 rounded-r"
//           >
//             Submit
//           </button>
//         </form>
//       </div>

//       {createdBranch && (
//         <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-xl">
//           <div className="bg-slate-600 p-4">
//             <h2 className="text-white text-xl font-bold">Created Branch</h2>
//           </div>
//           <div className="p-4">
//             <p className="text-lg">
//               <strong>Branch Name:</strong> {createdBranch.name}
//             </p>
//           </div>
//         </div>
//       )}

//       {error && message}

//       <table>
//         {branches.map(({ name, _id }) => {
//           return (
//             <tr>
//               <td>
//                 {name} <button onClick={() => handleDelete(_id)} style={{color:"red"}}>delete</button>{" "}
//               </td>
//             </tr>
//           );
//         })}
//       </table>
//     </div>
//   );
// };

// export default Branch;

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
import { GiBrassEye } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { createBranch, deleteBranch, getAllBranches } from "../service/apiService";
import { errorToastify, successToastify } from "../Components/Student/toastify";
import { Filter } from "@mui/icons-material";
import { AiFillDelete } from "react-icons/ai";

const Trainers = () => {
  const [name, setName] = useState("");
  const [gridData, setGridData] = useState();

//reuse
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

//reuse

  const [data, setdata] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handleBranch = async () => {
    try {
      const response = await createBranch(name);
      successToastify("Create branch");
    } catch (error) {
      errorToastify(error?.message);
    }
    getBranches();
  };

  const getBranches = async () => {
    try {
      const response = await getAllBranches();
      setdata(response);
    } catch (error) {
      errorToastify(error?.message);
    }
  };

  useEffect(() => {
    getBranches();

    // setGridData(data); //
  }, [refresh]);

  const EditButtonComponent = () => {
    return (
      <button
        onClick={() => {
          // Open an edit dialog
        }}
      >
        Edit
      </button>
    );
  };


const handledelete=async(id)=>{
  // window.location.reload()
  try {
    const response = await deleteBranch(id)
    setRefresh(!refresh)

    successToastify(response.message);
  } catch (error) {
    console.log(error,'--err');
    errorToastify(error?.message);
  }
  

}


  const DeleteButtonComponent = () => {
    return (
      <button
        onClick={() => {
          // Delete the selected row
        }}
      >
        Delete
      </button>
    );
  };

  const tableHeaders = ["Name", "Created date", "Updated date", "Action"];

  const handleViewRow = (student) => {
    // Handle viewing a row (if needed)
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mx-auto p-10 bg-white rounded-3xl">
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

      <div className="container mx-auto p-3 text-white rounded-3xl">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl text-black font-bold mb-4">Student</h1>

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
    </div>
  );
};

export default Trainers;

import React, { useState, useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsPenFill } from "react-icons/bs";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import SubmitForm from "./SubmitForm";
import { getActivity } from "./apiServices";

const Activity = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activityResponse, setActivityResponse] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getActivity().then((res) => {
      setActivityResponse(res.result);
    });
  }, []);

  const handleSubmit = (student) => {
    setSelectedTask(student);
    setIsModalOpen(true);
  };

  const handleView = (student) => {
    setSelectedTask(student);
    setIsModalOpen1(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [isRemarksModalOpen, setIsRemarksModalOpen] = useState(false);

  const handleRemarksButtonClick = () => {
    setIsRemarksModalOpen(true);
  };

  const closeRemarksPopup = () => {
    setIsRemarksModalOpen(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when changing rows per page
  };

  const rowsToDisplay = activityResponse.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );



 

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  backgroundColor: "#475569",
                  color: "white",
                  fontSize: "17px",
                }}
              >
                Topic
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "#475569",
                  color: "white",
                  fontSize: "17px",
                }}
              >
                Due Date
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "#475569",
                  color: "white",
                  fontSize: "17px",
                }}
              >
                Type
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "#475569",
                  color: "white",
                  fontSize: "17px",
                }}
              >
                Evaluated by
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "#475569",
                  color: "white",
                  fontSize: "17px",
                }}
              >
                Status
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "#475569",
                  color: "white",
                  fontSize: "17px",
                }}
              >
                mode
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "#475569",
                  color: "white",
                  fontSize: "17px",
                }}
              >
                venue
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "#475569",
                  color: "white",
                  fontSize: "17px",
                }}
              >
                Total mark
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "#475569",
                  color: "white",
                  fontSize: "17px",
                }}
              >
                Mark Obtained
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "#475569",
                  color: "white",
                  fontSize: "17px",
                }}
              >
               remarks
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "#475569",
                  color: "white",
                  fontSize: "17px",
                }}
              >
                Evaluate
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsToDisplay.map((student, index) => {
              const createdAtDate = new Date(student.duedate);
              const formattedDate = `${createdAtDate.getDate()} / ${
                createdAtDate.getMonth() + 1
              } / ${createdAtDate.getFullYear()}`;

              return (
                <TableRow key={index}>
                  <TableCell>{student.topic}</TableCell>
                  <TableCell>{formattedDate}</TableCell>
                  <TableCell>{student.type}</TableCell>

                  <TableCell>{student?.trainersName}</TableCell>
                  <TableCell>
                    {student?.answer?.status == null
                      ? "pending"
                      : student?.answer?.status}
                  </TableCell>
                  <TableCell>
                    {student.mode
                    
                    }
                    </TableCell>
                    <TableCell>
                    {student.modeLinkOrPlace
                    
                    }
                    </TableCell>
                  <TableCell>{student?.mark}</TableCell>
                  <TableCell>{student?.answer?.mark}</TableCell>
                  <TableCell><button onClick={handleRemarksButtonClick} >remarks</button></TableCell>
                  <TableCell>
                    {student.answer?.status === "evaluated" ? (
                      <AiFillCheckCircle
                        onClick={() => handleView(student)}
                        size={20}
                      />
                    ) : student.answer?.status === "submitted" ? (
                      <></>
                    ) : (
                      <>
                        <BsPenFill
                          onClick={() => handleSubmit(student)}
                          size={20}
                        />
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={activityResponse.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog
        open={isRemarksModalOpen}
        onClose={closeRemarksPopup}
      >
        <DialogContent>
          {/* Add your content for the remarks popup here */}
          <p>{activityResponse?.answer?.remark}</p>
         
          <button onClick={closeRemarksPopup}>Close Remarks</button>
        </DialogContent>
      </Dialog>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogContent>
          {selectedTask && (
            <SubmitForm
              topic={selectedTask.topic}
              duedate={selectedTask.duedate}
              note={selectedTask.notes}
              id={selectedTask._id}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Activity;

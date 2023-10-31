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
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import SubmitForm from "./SubmitForm";
import { getActivity } from "./apiServices";
import StudentViewpage from "./StudentViewpage";

const Activity = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activityResponse, setActivityResponse] = useState([]);

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

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
                Topic
              </TableCell>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
                Due Date
              </TableCell>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
                Type
              </TableCell>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
                Evaluated by
              </TableCell>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
                Status
              </TableCell>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
                Mark
              </TableCell>
              <TableCell style={{ backgroundColor: "#475569", color: "white", fontSize: "17px" }}>
                Evaluate
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activityResponse.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{student.topic}</TableCell>
                <TableCell>{student.duedate}</TableCell>
                <TableCell>{student.type}</TableCell>
                <TableCell>{student.branch}</TableCell>
                <TableCell>{student.answer?.status}</TableCell>
                <TableCell></TableCell>
                <TableCell>
                  {student.answer?.status === "submitted" ? (
                      <AiFillCheckCircle onClick={() => handleView(student)} size={20} />
                   
                  ) : (
                    <BsPenFill onClick={() => handleSubmit(student)} size={20} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
      <Dialog open={isModalOpen1} onClose={() => setIsModalOpen1(false)}>
        <DialogContent>
          {selectedTask && (
            <StudentViewpage
              id={selectedTask._id}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Activity;

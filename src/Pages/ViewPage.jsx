import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import viewPage from "../image/task_image.png";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import "./viewPage.css";
import { Pie, SparkLine } from "../Components";
import Line from "./Charts/Line";
import MessageInput from "../common/MessageInput";
import Doughnut from "../Components/Charts/Pie";
const ViewPage = ({ student, onClose }) => {
  const [taskTableData, setTaskTableData] = useState([
    {
      id: 1,
      task: "Project 1",
      grade: "A",
      topic: "API Integration",
      due_date: "12-3-2014",
      time: "3 hours",
      type: "ABC",
      evaluated_by: "XYZ",
      status: "Active",
      mark: 10,
      evaluated: "OK",
    },
  ]);

  const addTask = (
    task,
    grade,
    topic,
    due_date,
    time,
    type,
    evaluated_by,
    status,
    mark,
    evaluated
  ) => {
    if (
      task &&
      grade &&
      topic &&
      due_date &&
      time &&
      type &&
      evaluated_by &&
      status &&
      mark &&
      evaluated
    ) {
      const newTask = {
        id: taskTableData.length + 1,
        task: task,
        grade: grade,
        topic: topic,
        due_date: due_date,
        time: time,
        type: type,
        evaluated_by: evaluated_by,
        status: status,
        mark: mark,
        evaluated: evaluated,
      };
      setTaskTableData([...taskTableData, newTask]);
      return null; // Task added successfully
    } else {
      return "Please fill in all the task details."; // Task addition failed
    }
  };

  const [showForm, setShowForm] = useState(false);
  const [addError, setAddError] = useState(null);

  const toggleForm = () => {
    setShowForm(!showForm);
    setAddError(null); // Reset error when toggling form
  };

  const doughnutData = [
    { x: "Absent", y: 30 },
    { x: "Present", y: 20 },
  ];

  return (
    <div>
      <div className=" justify-between bg-white p-10 mb-4 ">
        <div className="flex justify-between floa  p-4 mb-4 ">
          <h2 className=" text-2xl font-bold">Student Task Details</h2>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <AiFillCloseCircle />
          </button>
        </div>
        <Doughnut data={doughnutData} />
        <Line />
        <div>
          <Button variant="outlined" onClick={toggleForm}>
            Add Task
          </Button>
        </div>
        <br />
        <div className={`overlay${showForm ? " active" : ""}`}>
          <div className="popup">
            {showForm && (
              <div className="flex flex-col md:flex-row bg-white p-1 mb-1 gap- justify-between  ">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const topic = e.target.topic.value;
                    const due_date = e.target.due_date.value;
                    const time = e.target.time.value;
                    const type = e.target.type.value;
                    const evaluated_by = e.target.evaluated_by.value;
                    const status = e.target.status.value;
                    const mark = e.target.mark.value;
                    const evaluated = e.target.evaluated.value;

                    const error = addTask(
                      topic,
                      due_date,
                      time,
                      type,
                      evaluated_by,
                      status,
                      mark,
                      evaluated
                    );

                    if (!error) {
                      e.target.reset();
                    } else {
                      setAddError(error); // Set error state
                    }
                  }}
                >
                  <div className=" p-12 text-7xl text-neutral-700 font-bold mb-3">
                    <h2 className="p-12">Welcome Admin ! </h2>
                      <img style={{width:"200px" , height:"200px" }}  src={viewPage} />
                  </div>
                  <div className= "  text-2xl text-neutral-600 font-bold mb-3">
                    <span className="  text-balck font-bold ">
                      Add Task Here
                    </span>
                  </div>
                  <br />
                  <br />
                  <div className="flex flex-col md:flex-row mb-4">
                    <div class="relative z-0 w-full mb-6 group">
                      <label
                        htmlFor="topic"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Topic:
                      </label>
                      <input
                        type="text"
                        name="topic"
                        id="topic"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>

                    <div class="relative z-0 w-full mb-6 group">
                      <label
                        htmlFor="due_date"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Due Date:
                      </label>
                      <input
                        type="text"
                        name="due_date"
                        id="due_date"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row mb-4">
                    <div class="relative z-0 w-full mb-6 group">
                      <label
                        htmlFor="time"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Time:
                      </label>
                      <input
                        type="text"
                        name="time"
                        id="time"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>

                    <div class="relative z-0 w-full mb-6 group">
                      <label
                        htmlFor="type"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Type:
                      </label>
                      <input
                        type="text"
                        name="type"
                        id="type"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row mb-4">
                    <div class="relative z-0 w-full mb-6 group">
                      <label
                        htmlFor="evaluated_by"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Evaluated By
                      </label>
                      <input
                        type="text"
                        name="evaluated_by"
                        id="evaluated_by"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>

                    <div class="relative z-0 w-full mb-6 group">
                      <label
                        htmlFor="status"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Status
                      </label>
                      <input
                        type="text"
                        name="status"
                        id="status"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row mb-4">
                    <div class="relative z-0 w-full mb-6 group">
                      <label
                        htmlFor="mark"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Mark:
                      </label>
                      <input
                        type="text"
                        name="mark"
                        id="mark"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>

                    <div class="relative z-0 w-full mb-6 group">
                      <label
                        htmlFor="evaluated"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Evaluated:
                      </label>
                      <input
                        type="text"
                        name="evaluated"
                        id="evaluated"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button
                      type="submit"
                      className="bg-neutral- hover:bg-gray-900 text- font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Add Task
                    </button>

                    <button
                      className="bg-neutral- hover:bg-gray-900 text-neutral-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={toggleForm}
                    >
                      close
                    </button>
                  </div>

                  {addError && (
                    <div className="mt-4 text-red-600">{addError}</div>
                  )}

                  <MessageInput
                    id="task"
                    type="error"
                    // label="Task"
                    error={addError}
                  />
                </form>
              </div>
            )}
          </div>
        </div>

        <TableContainer
          component={Paper}
          className="max-w-full overflow-x-auto"
        >
          <Table className="min-w-full">
            <TableHead>
              <TableRow>
                <TableCell className="py-2">Task</TableCell>
                <TableCell className="py-2">Grade</TableCell>
                <TableCell className="py-2">Topic</TableCell>
                <TableCell className="py-2">Due Date</TableCell>
                <TableCell className="py-2">Time</TableCell>
                <TableCell className="py-2">Type</TableCell>
                <TableCell className="py-2">Evaluated By</TableCell>
                <TableCell className="py-2">Status</TableCell>
                <TableCell className="py-2">Mark</TableCell>
                <TableCell className="py-2">Evaluated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taskTableData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="py-2">{row.task}</TableCell>
                  <TableCell className="py-2">{row.grade}</TableCell>
                  <TableCell className="py-2">{row.topic}</TableCell>
                  <TableCell className="py-2">{row.due_date}</TableCell>
                  <TableCell className="py-2">{row.time}</TableCell>
                  <TableCell className="py-2">{row.type}</TableCell>
                  <TableCell className="py-2">{row.evaluated_by}</TableCell>
                  <TableCell className="py-2">{row.status}</TableCell>
                  <TableCell className="py-2">{row.mark}</TableCell>
                  <TableCell className="py-2">{row.evaluated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ViewPage;

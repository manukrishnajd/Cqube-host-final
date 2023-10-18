import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import SparkLine from "../Charts/SparkLine";
import { Pie } from "../../Pages";
import { SortableTable } from "../../common/Table";

const StudentPopup = ({ student, onClose }) => {
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
      evaluated: "OK"
    },
  ]);

  const addTask = (task, grade, topic, due_date, time, type, evaluated_by, status, mark, evaluated) => {
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
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md backdrop-filter">
      <div className="bg-white rounded-lg p-8 w-5/6 max-w-screen-2x1 overflow-y-auto h-3/4">
        <div className="flex justify-between bg-neutral-700 p-4 mb-4 rounded-xl">
          <h2 className="text-white text-2xl font-bold">Student Task Details</h2>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <AiFillCloseCircle />
          </button>
        </div>
        <div>
          <Pie />
        </div>

        <div>
        <div>
        <form
  className="max-w-sm mx-auto p-6 bg-white rounded shadow-md"
  onSubmit={(e) => {
    e.preventDefault();
    const task = e.target.task.value;
    const grade = e.target.grade.value;
    const topic = e.target.topic.value;
    const due_date = e.target.due_date.value;
    const time = e.target.time.value;
    const type = e.target.type.value;
    const evaluated_by = e.target.evaluated_by.value;
    const status = e.target.status.value;
    const mark = e.target.mark.value;
    const evaluated = e.target.evaluated.value;

    if (task && grade) {
      addTask(task, grade, topic, due_date, time, type, evaluated_by, status, mark, evaluated);
      e.target.reset();
    }
  }}
>
  <div className="mb-4">
    <label htmlFor="task" className="block text-gray-700 text-sm font-bold mb-2">
      Task:
    </label>
    <input type="text" name="task" id="task" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
  </div>

  <div className="mb-4">
    <label htmlFor="grade" className="block text-gray-700 text-sm font-bold mb-2">
      Grade:
    </label>
    <input type="text" name="grade" id="grade" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
  </div>
  <div className="mb-4">
    <label htmlFor="topic" className="block text-gray-700 text-sm font-bold mb-2">
      Topic:
    </label>
    <input type="text" name="topic" id="topic" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
  </div>
  <div className="mb-4">
    <label htmlFor="due_date" className="block text-gray-700 text-sm font-bold mb-2">
      Due Date:
    </label>
    <input type="text" name="due_date" id="due_date" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
  </div>
  <div className="mb-4">
    <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">
      Time:
    </label>
    <input type="text" name="time" id="time" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
  </div>
  <div className="mb-4">
    <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">
      Type:
    </label>
    <input type="text" name="type" id="type" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
  </div>
  <div className="mb-4">
    <label htmlFor="evaluated_by" className="block text-gray-700 text-sm font-bold mb-2">
    Evaluated By
    </label>
    <input type="text" name="evaluated_by" id="evaluated_by" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
  </div>
  <div className="mb-4">
    <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">
    Status
    </label>
    <input type="text" name="status" id="status" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
  </div>
  <div className="mb-4">
    <label htmlFor="mark" className="block text-gray-700 text-sm font-bold mb-2">
    Mark:
    </label>
    <input type="text" name="mark" id="mark" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
  </div>
  <div className="mb-4">
    <label htmlFor="evaluated" className="block text-gray-700 text-sm font-bold mb-2">
    Evaluated:
    </label>
    <input type="text" name="evaluated" id="evaluated" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
  </div>


  <div className="mt-6">
    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      Add Task
    </button>
  </div>
</form>

        </div>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Topic</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Evaluated By</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Mark</TableCell>
                <TableCell>Evaluated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taskTableData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.task}</TableCell>
                  <TableCell>{row.grade}</TableCell>
                  <TableCell>{row.topic}</TableCell>
                  <TableCell>{row.due_date}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.evaluated_by}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.mark}</TableCell>
                  <TableCell>{row.evaluated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="profile-details">{/* <h1>{student.name}</h1> */}</div>

       
       
      </div>
    </div>
  );
};

export default StudentPopup;

import React from "react";
import { Link } from "react-router-dom";

const QuickActions = () => {
  const handleAddStudent = () => {
    navigate("/admin/student"); // Correct syntax for invoking useNavigate
  };

  const handleAssignCourse = () => {
    // Implement logic to assign a course to a student
  };

  const handleAddTrainer = () => {
    // Implement logic to add a new trainer
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="flex space-x-4">
        <Link to="/admin/student">
          {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> */}
            Add Student
          {/* </button> */}
        </Link>

        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAssignCourse}
        >
          Assign Course
        </button>
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddTrainer}
        >
          Add Trainer
        </button>
        <button
          className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddTrainer}
        >
          Add Course
        </button>
      </div>
    </div>
  );
};

export default QuickActions;

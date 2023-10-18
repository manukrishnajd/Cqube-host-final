import React from "react";
import Chart from "chart.js/auto"; // Import Chart.js
import { Link } from "react-router-dom";
import { GrFormViewHide } from "react-icons/gr";
import { MdViewInAr } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";

const StudentDetailsModal = ({ selectedStudent, toggleModal }) => {
  // Dummy data for student performance
  const performanceData = {
    labels: ["Tasks", "Tests", "Presentations"],
    datasets: [
      {
        label: "Performance",
        data: [
          selectedStudent.taskPerformance,
          selectedStudent.testPerformance,
          selectedStudent.presentationPerformance,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Dummy data for student attendance
  const attendanceData = {
    labels: ["Present", "Absent", "Late"],
    datasets: [
      {
        label: "Attendance",
        data: [
          selectedStudent.presentCount,
          selectedStudent.absentCount,
          selectedStudent.lateCount,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Function to create the performance chart
  const createPerformanceChart = () => {
    const ctx = document.getElementById("performanceChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: performanceData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  // Function to create the attendance chart
  const createAttendanceChart = () => {
    const ctx = document.getElementById("attendanceChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: attendanceData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  // Call the chart creation functions
  React.useEffect(() => {
    createPerformanceChart();
    createAttendanceChart();
  }, [selectedStudent]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-white w-1/2 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 px-6">
          <div className="flex justify-between items-center pb-3">
            <h2 className="text-2xl font-bold text-navy">Student Details</h2>
            <div className="flex">
              <Link to="/admin/viewpage" className="mr-2">
                <button className="text-3xl leading-none border-none">
                <MdViewInAr/>

                </button>
              </Link>
              <Link to="/admin/student" >
              <button
                className="text-3xl leading-none border-none"
              >
                <AiFillCloseCircle/>
              </button>
              </Link>
              
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Performance </h3>
            <canvas id="performanceChart" width="400" height="200"></canvas>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Attendance</h3>
            <canvas id="attendanceChart" width="400" height="200"></canvas>
          </div>

          {/* Student Details */}
          <div>
            <h2 className="text-xl font-semibold mb-1">Student Information</h2>
            <p className="text-gray-700">
              <span className="font-semibold">Name:</span>{" "}
              {selectedStudent.name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Phone:</span>{" "}
              {selectedStudent.phone}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span>{" "}
              {selectedStudent.email}
            </p>
            {/* Add more details as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsModal;

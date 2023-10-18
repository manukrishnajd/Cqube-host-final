import React from "react";

const AdminStudentReports = () => {
  // Dummy student report data
  const studentReports = [
    { id: 1, name: "John Doe", progress: "80%", feedback: "Good progress", status: "completed" },
    { id: 2, name: "Jane Smith", progress: "60%", feedback: "Needs improvement", status: "active" },
    { id: 3, name: "Alex Johnson", progress: "100%", feedback: "Excellent work", status: "completed" },
    { id: 4, name: "Mary Lee", progress: "50%", feedback: "Making steady progress", status: "active" },
    { id: 5, name: "Michael Brown", progress: "30%", feedback: "Needs guidance", status: "active" },
  ];
  

  return (
    <div className="bg-half-transparent p-4 rounded-s-2xl  shadow">
      <table className="min-w-full  text-white rounded-s-2xl shadow-2xl ">
        <thead>
          <tr  >
            <th className=" text-slate-600 py-2">ID</th>
            <th className=" text-slate-600 py-2">Name</th>
            <th className="  text-slate-600 py-2">Progress</th>
            <th className=" text-slate-600 py-2">Status</th>
            <th className=" text-slate-600 py-2">Feedback</th>
          </tr>
        </thead>
        <tbody>
          {studentReports.map((report) => (
            <tr key={report.id}>
              <td className="py-2">{report.id}</td>
              <td className="py-2">{report.name}</td>
              <td className="py-2">{report.progress}</td>
              <td className="py-2">{report.status}</td>
              <td className="py-2">{report.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStudentReports;

import React from 'react';

const AdminTrainerReports = () => {
  // Dummy trainer report data
  const trainerReports = [
    { id: 1, name: 'Trainer 1', assignedInterns: 5, feedback: 'Responsive and helpful' },
    { id: 2, name: 'Trainer 2', assignedInterns: 8, feedback: 'Excellent guidance' },
    // Add more report data as needed
  ];

  return (
    <div className="bg-half-transparent p-4 rounded-s-2xl  shadow">
    <table className="min-w-full  text-white rounded-s-2xl shadow-2xl ">
        <thead>
          <tr>
            <th className=" text-slate-600 py-2">ID</th>
            <th className=" text-slate-600 py-2">Name</th>
            <th className=" text-slate-600 py-2">Assigned Interns</th>
            <th className=" text-slate-600 py-2">Feedback</th>
          </tr>
        </thead>
        <tbody>
          {trainerReports.map(report => (
            <tr key={report.id}>
              <td className="py-2">{report.id}</td>
              <td className="py-2">{report.name}</td>
              <td className="py-2">{report.assignedInterns}</td>
              <td className="py-2">{report.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTrainerReports;

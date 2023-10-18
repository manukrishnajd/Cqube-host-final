import React from 'react';
import AdminStudentReports from '../Components/AdminREport/AdminStudentReport';
import AdminTrainerReports from '../Components/AdminREport/AdminTrainerReport';


const AdminReportsPage = () => {
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Admin Reports Dashboard</h2>
      
      {/* Student Reports */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Student Reports</h3>
        <AdminStudentReports />
      </div>

      {/* Trainer Reports */}
      <div>
        <h3 className="text-xl font-bold mb-2">Trainer Reports</h3>
        <AdminTrainerReports />
      </div>
    </div>
  );
};

export default AdminReportsPage;

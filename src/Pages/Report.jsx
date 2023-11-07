import React, { useState } from 'react';
import AdminStudentReports from '../Components/AdminREport/AdminStudentReport';
import AdminTrainerReports from '../Components/AdminREport/AdminTrainerReport';
import AdminAttendanceReports from '../Components/AdminREport/AdminTrainerReport';
import AdminCourseReports from '../Components/AdminREport/AdminCourseReport';

const AdminReportsPage = () => {
  const [activeTab, setActiveTab] = useState('Student');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col bg-slate-200">
      <h2 className="text-2xl font-bold mb-4">Admin Reports Dashboard</h2>
      <div className="flex space-x-4">
        <TabButton
          label="Student"
          activeTab={activeTab}
          onClick={() => handleTabClick('Student')}
        />
        <TabButton
          label="Attendance"
          activeTab={activeTab}
          onClick={() => handleTabClick('Attendance')}
        />
        <TabButton
          label="Courses"
          activeTab={activeTab}
          onClick={() => handleTabClick('Courses')}
        />
      </div>

      {activeTab === 'Student' && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-2">Student Reports</h3>
          <AdminStudentReports />
        </div>
      )}

      {activeTab === 'Attendance' && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-2">Attendance Reports</h3>
          <AdminAttendanceReports />
        </div>
      )}

      {activeTab === 'Courses' && (
        <div>
          <h3 className="text-xl font-bold mb-2">Courses Reports</h3>
          <AdminCourseReports />
        </div>
      )}
    </div>
  );
};

function TabButton({ label, activeTab, onClick }) {
  return (
    <button
      className={`${
        activeTab === label ? 'bg-blue-500' : 'bg-gray-300'
      } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default AdminReportsPage;

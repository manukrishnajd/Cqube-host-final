import React from 'react';
import './PresentAbsent.css';  // Import the CSS for styling

const PresentAbsent = () => {
  // Replace these with actual data from your application
  const trainersPresent = 15;
  const trainersAbsent = 5;
  const studentsPresent = 80;
  const studentsAbsent = 20;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="card">
        <h3 className="text-sm font-semibold text-white mb-2">Trainers Present</h3>
        <p className="text-2xl font-bold text-orange-400">{trainersPresent}</p>
      </div>
      <div className="card">
        <h3 className="text-sm font-semibold text-white mb-2">Trainers Absent</h3>
        <p className="text-2xl font-bold text-orange-400">{trainersAbsent}</p>
      </div>
      <div className="card">
        <h3 className="text-sm font-semibold text-white mb-2">Students Present</h3>
        <p className="text-2xl font-bold text-orange-400">{studentsPresent}</p>
      </div>
      <div className="card">
        <h3 className="text-sm font-semibold text-white mb-2">Students Absent</h3>
        <p className="text-2xl font-bold text-orange-400">{studentsAbsent}</p>
      </div>
    </div>
  );
}

export default PresentAbsent;

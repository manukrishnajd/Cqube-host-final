import React, { useEffect, useState } from 'react';
import { getActivity } from './apiServices';

function StudentViewpage() {
  const [activityResponse, setActivityResponse] = useState([]);

  useEffect(() => {
    getActivity().then((res) => {
      setActivityResponse(res.result);
    });
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4">Assignment Report</h1>
      {activityResponse.map((assignment, index) => (
        <div key={index} className="bg-gray-200 p-2 rounded-md mb-2">
          <p className="font-semibold text-lg">Assignment</p>
          <p>Topic: {assignment.topic}</p>
          <p>Score: {assignment.mark}</p>
          <p>Notes: {assignment.answer?.mark}</p>
          <p>Trainer: {assignment.trainersName}</p>
          {/* Add more properties you want to display */}
        </div>
      ))}
    </div>
  );
}

export default StudentViewpage;


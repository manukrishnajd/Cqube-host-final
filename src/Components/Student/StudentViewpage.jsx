import React from 'react';

function StudentViewpage() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4">Assignment Report</h1>
      <div className="bg-gray-200 p-2 rounded-md mb-2">
        <p className="font-semibold text-lg">Tips</p>
        <p>Your tips content goes here.</p>
      </div>
      <div className="bg-gray-200 p-2 rounded-md mb-2">
        <p className="font-semibold text-lg">Result</p>
        <p></p>
      </div>
      <div className="bg-gray-200 p-2 rounded-md mb-2 w-24">
        <p className="font-semibold text-lg">Score : 9</p>
        
      </div>
    </div>
  );
}

export default StudentViewpage;

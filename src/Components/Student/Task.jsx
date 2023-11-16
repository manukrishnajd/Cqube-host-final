import React from 'react';
import UpcomingTask from './UpcomingTask';
import AssignmentDetails from './AssignmentDetails';
import { useState } from 'react';
import StudentProfile from './StudentProfile';
import { useTokenVerification } from './apiServices';
import UpcomingTasks from './UpcomingTask';

function Task() {
  useTokenVerification();

  return (
    <div>
      <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <div className=" font-semibold mb-4 bg-slate-500 h-16 text-4xl pt-3 text-gray-50 text-center rounded-xl">Upcoming Task</div>
        <div>
          <UpcomingTasks/>
        </div>

        <div className=" font-semibold mt-4 mb-4  bg-slate-500 h-16 text-4xl pt-3 text-gray-50 text-center rounded-xl">Assignment Details</div>

        <AssignmentDetails />
      </div>
    </div>
  );
}

export default Task;

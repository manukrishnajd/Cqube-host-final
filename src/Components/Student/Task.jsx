import React from 'react'
import UpcomingTask from './UpcomingTask'

import AssignmentDetails from './AssignmentDetails'

import { useState } from "react";
import StudentProfile from './StudentProfile';



function Task() {


  return (
    <div>
        
        

        
        <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <div className="flex text-xl font-semibold mb-4  ">
       Upcoming Task
      </div>
        <UpcomingTask/>
        <div className="flex text-xl font-semibold mb-4  ">
        Assignment Details
      </div>

        <AssignmentDetails/>
       
        
        
        </div>
        
        </div>
  )
}

export default Task

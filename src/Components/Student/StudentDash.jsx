import React from 'react'
import { Line, Pie } from '../../Pages'
// import StudentViewpage from './StudentViewpage'
import {useTokenVerification} from './apiServices'
import AttendPie from './AttendenceReport'

function StudentDash() {

  useTokenVerification()
  return (
    <div>
      <AttendPie/>
      {/* <Line/> */}
    </div>
  )
}

export default StudentDash

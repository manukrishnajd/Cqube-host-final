import React from 'react'
import { Line, Pie } from '../../Pages'
import StudentViewpage from './StudentViewpage'
import {useTokenVerification} from './apiServices'

function StudentDash() {

  useTokenVerification()
  return (
    <div>
      <Pie/>
      <Line/>
    </div>
  )
}

export default StudentDash

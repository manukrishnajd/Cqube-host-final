import React from 'react'
import '../../src/App.css'
import Doughnut from '../Components/Charts/Pie'
import Task from './Task';
import { LineChart } from '../Components';
import Activity from './activity';



const Studentdetail = () => {
    const doughnutData = [
        { x: 'Absent', y: 30 },
        { x: 'Present', y: 20 },
      ];
  return (
    <div className='bg-white p-5'>
        <h1 className='font-bold text-2xl mt-3 text-slate-600 m-auto'>Progress of Student name <br />
        </h1>
  <p className='text-2xl font-bold m-auto w-fit'>Attendance</p>
  <Doughnut data={doughnutData}/>
  {/* <p className='text-2xl font-bold m-auto w-fit'>Activity</p>
<LineChart/> */}
  <div>
  <p className='text-2xl font-bold m-auto w-fit'>Activity</p><br />
    <Activity/>
  </div>
    
    </div>
  )
}

export default Studentdetail

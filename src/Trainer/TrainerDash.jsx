import React from 'react'
import Doughnut from '../Components/Charts/Pie';
import { LineChart } from 'recharts';

const TrainerDashboard = () => {
    const doughnutData = [
        { x: 'Absent', y: 30 },
        { x: 'Present', y: 20 },
      ];

  return (
    <div>
        <Doughnut data={doughnutData}/>
        <LineChart/>
        
      
    </div>
  )
}

export default TrainerDashboard

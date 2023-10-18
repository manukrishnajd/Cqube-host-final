import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Marks',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
      },
      {
        label: 'Tasks',
        data: [],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
      },
    ],
  });

  // Simulated data for demonstration
  const studentData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    marks: [80, 85, 78, 90, 88],
    tasks: [5, 7, 6, 8, 7],
  };

  useEffect(() => {
    setChartData({
      ...chartData,
      labels: studentData.labels,
      datasets: [
        {
          ...chartData.datasets[0],
          data: studentData.marks,
        },
        {
          ...chartData.datasets[1],
          data: studentData.tasks,
        },
      ],
    });
  }, [studentData]);

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default LineChart;

import React from 'react';
import { ChartsHeader, LineChart } from '../../Components';

const Line = () => {
  const studentData = [
    { task: 'Task 1', mark: 85 },
    { task: 'Task 2', mark: 90 },
    { task: 'Task 3', mark: 80 },
  ];
  // Extracting the task names and marks for the line chart
  const tasks = studentData.map(item => item.task);
  const marks = studentData.map(item => item.mark);

  return (
    <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
      <ChartsHeader category='Line' title='Student Performance' />
      <div className='w-full'>
        <LineChart labels={tasks} data={marks} />
      </div>
    </div>
  );
};

export default Line;

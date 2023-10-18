import React from 'react';

import { AttendanceChart } from '../../Data/dummy';
import { ChartsHeader, Pie as PieChart } from '../../Components';

const Pie = () => (


  
  <div className="m-4 md:m-10 mt-24  p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    <ChartsHeader category="Pie" title="Attendence" />
    <div className="w-full">
      <PieChart id="chart-pie" data={AttendanceChart} legendVisiblity height="full" />
    </div>
  </div>
);

export default Pie;
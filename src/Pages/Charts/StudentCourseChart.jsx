import React from 'react';

import { StudentCourseChart } from '../../Data/dummy';
import { ChartsHeader, Pie as PieChart } from '../../Components';

const Pie = () => (


  
  <div className=" bg-white dark:bg-secondary-dark-bg rounded-3xl">
    {/* <ChartsHeader category="Pie" title="Attendence" />
    <div className="w-full"> */}
      <PieChart id="chart-pie" data={StudentCourseChart} legendVisiblity height="full" />
    {/* </div> */}
  </div>
);

export default Pie;
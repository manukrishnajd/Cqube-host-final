import React, { useState } from 'react';
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationLegend,
  PieSeries,
  AccumulationDataLabel,
  Inject,
  AccumulationTooltip,
} from '@syncfusion/ej2-react-charts';

import { useStateContext } from '../Contexts/ContextProvider';
// import { errorToastify } from './toastify';

const Doughnut = ({ id, data, legendVisibility, height }) => {
  const { currentMode } = useStateContext();

  console.log(data,'hgf');

  const [nodata,setnodata]=useState(false)

  const presentCount = data.attendanceCount; // Assuming data[0] is the present count
  const absentCount = data.absenceCount;  // Assuming data[1] is the absent count
  if (presentCount ==0 && absentCount==0) {
    console.log('nodata');
    return(
<div className='text-gray-600 ms-0 font-'>
      <h2>no data</h2>
</div>
    )
  }
  // Structure data for the pie chart
  const pieData = [
    { x: 'Present', y: presentCount },
    { x: 'Absent', y: absentCount },
  ];

  return (

    <AccumulationChartComponent
      id={id}
      legendSettings={{ visible: legendVisibility, background: 'white' }}
      height={height}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      tooltip={{ enable: true }}
    >
      <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip]} />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          name="Attendance"
          dataSource={pieData}
          xName="x"
          yName="y"
          innerRadius="40%"
          startAngle={0}
          endAngle={360}
          radius="70%"
          dataLabel={{
            visible: true,
            name: 'text',
            position: 'Inside',
            font: {
              fontWeight: '600',
              color: '#fff',
            },
          }}
        />
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  );
};

export default Doughnut;

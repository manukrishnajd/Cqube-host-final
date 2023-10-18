import React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, ColumnSeries, Tooltip } from '@syncfusion/ej2-react-charts';

const CoursesChart = ({ width, height, data }) => {
  return (
    <ChartComponent
      id="coursesChart"
      primaryXAxis={{ valueType: 'Category' , majorGridLines: { width: 0 } }}
      primaryYAxis={{ title: 'Total Courses' , majorGridLines: { width: 0 } }}
      width={width}
      height={height}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
    >
      <Inject services={[ColumnSeries, Category, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        <SeriesDirective dataSource={data} xName="month" yName="count" name="Total Courses" type="Column" fill='orange' />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default CoursesChart;

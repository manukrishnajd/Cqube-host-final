import React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, ColumnSeries, Tooltip } from '@syncfusion/ej2-react-charts';

const StudentChart = ({ width, height, data }) => {
  return (
    <ChartComponent
    id="studentChart"
    primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 } }}
    primaryYAxis={{ title: 'Total Students', majorGridLines: { width: 0 }, minimum: 0, maximum: 10, interval: 1 }}
    width={width}
    height={height}
    chartArea={{ border: { width: 0 }  }}
    tooltip={{ enable: true }}
  >
    <Inject services={[ColumnSeries, Category, Legend, Tooltip]} />
    <SeriesCollectionDirective>
      <SeriesDirective dataSource={data} xName="month" yName="count" name="Total Students" type="Column" fill='orange' />
    </SeriesCollectionDirective>
  </ChartComponent>
  );
};

export default StudentChart;

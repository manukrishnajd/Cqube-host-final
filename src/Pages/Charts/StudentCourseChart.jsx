import React, { useEffect, useState } from 'react';
import { ChartsHeader, Pie as PieChart } from '../../Components';
import { studentCountbyCourse } from '../../service/apiService';
import { errorToastify } from '../../Components/Student/toastify';

const Pie = () => {
  const [studentdata, setStudentData] = useState([]);
  const [studentcount, setCountStudent] = useState(0);

  useEffect(() => {
    getCounts();
  }, []);

  const getCounts = async () => {
    try {
      const response = await studentCountbyCourse();

      console.log(response?.result,'resultss');
      setCountStudent(response?.result);
      console.log('count of subcourse', response);
      // Assuming response.result is an array of objects with properties course, value, and count.
      const formattedData = response?.result.map(item => (console.log(item),{
       
        x: item.courseName,
        y: item.count[0],
        text: item.count[0],
      }));
      setStudentData(formattedData);
      console.log(studentdata,'datas of student');
    } catch (error) {
      console.log(error, 'error');
      errorToastify(error?.message);
    }
  };

  return (
    <div className=" bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <PieChart id="chart-pie" data={studentdata} legendVisiblity height="full" />
    </div>
  );
};

export default Pie;

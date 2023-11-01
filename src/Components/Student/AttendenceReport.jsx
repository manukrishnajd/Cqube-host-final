import React, { useEffect, useState } from 'react';
import { ChartsHeader, Pie as PieChart } from '../../Components';
import { studentCountbyCourse } from '../../service/apiService';
import { errorToastify } from '../../Components/Student/toastify';
import { AttendenceByCount, AttendenceByCountfilter } from './apiServices';
import Doughnut from './AttendencePie';

const AttendPie = () => {
  const [studentdata, setStudentData] = useState([]);
  const [studentcount, setCountStudent] = useState(0);
  const [count,setCount]=useState([])
  const [startdate,setstartdate]=useState()
  const [enddate,setenddate]=useState()

  useEffect(() => {
    getCounts();
  }, []);

  const getCounts = async () => {
    try {
      const response = await AttendenceByCount();

    
      console.log(response?.result,'resultss');
      setCountStudent(response?.result);
      console.log('count of subcourse', response);
      // Assuming response.result is an array of objects with properties course, value, and count.

      console.log(studentdata,'datas of student');
    } catch (error) {
      console.log(error, 'error');
      errorToastify(error?.message);
    }
  };
console.log(studentdata,'oiuytf');

//date picker
const handlestartdate=(e)=>{
  setstartdate(e.target.value)

}
const handleenddate=(e)=>{
  setenddate(e.target.value)

}
const submitDate=async(e)=>{
  e.preventDefault()
  console.log('clicked');
  setstartdate(startdate)
  setenddate(enddate)
  if(startdate && enddate){

    const filterresponse=await AttendenceByCountfilter(startdate,enddate)
    console.log(filterresponse,'cdfvgbhn');
    setCountStudent(filterresponse?.result); 
    console.log(studentcount);
  }
}


  return (

  <>
  <form onSubmit={submitDate}>

  <input type="date" onChange={handlestartdate} />
  <input type="date" onChange={handleenddate}/>
  <input type="submit" value='check'/>
  </ form>
    <div className=" bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <Doughnut id="chart-pie" data={studentcount} legendVisiblity height="full" />
    </div>
  </>
  );
};

export default AttendPie;

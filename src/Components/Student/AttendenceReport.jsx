import React, { useEffect, useState } from "react";
import { ChartsHeader, Pie as PieChart } from "../../Components";
import { studentCountbyCourse } from "../../service/apiService";
import { errorToastify } from "../../Components/Student/toastify";
import { AttendenceByCount, AttendenceByCountfilter } from "./apiServices";
import Doughnut from "./AttendencePie";

const AttendPie = () => {
  const [studentdata, setStudentData] = useState([]);
  const [studentcount, setCountStudent] = useState(0);
  const [count, setCount] = useState([]);
  const [startdate, setstartdate] = useState();
  const [enddate, setenddate] = useState();

  useEffect(() => {
    getCounts();
  }, []);

  const getCounts = async () => {
    try {
      const response = await AttendenceByCount();

      console.log(response?.result, "resultss");
      setCountStudent(response?.result);
      console.log("count of subcourse", response);
      // Assuming response.result is an array of objects with properties course, value, and count.

      console.log(studentdata, "datas of student");
    } catch (error) {
      console.log(error, "error");
      errorToastify(error?.message);
    }
  };
  console.log(studentdata, "oiuytf");

  //date picker
  const handlestartdate = (e) => {
    setstartdate(e.target.value);
  };
  const handleenddate = (e) => {
    setenddate(e.target.value);
  };
  const submitDate = async (e) => {
    e.preventDefault();
    console.log("clicked");
    setstartdate(startdate);
    setenddate(enddate);
    if (startdate && enddate) {
      const filterresponse = await AttendenceByCountfilter(startdate, enddate);
      console.log(filterresponse, "cdfvgbhn");
      setCountStudent(filterresponse?.result);
      console.log(studentcount);
    }
  };

  return (
    <>
      <div className=" bg-white dark:bg-secondary-dark-bg rounded-3xl mt-8">
        <form
          onSubmit={submitDate}
          className="max-w-xs mx-auto mt-8 p-16"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="start-date"
            >
              Start Date
            </label>
            <input
              id="start-date"
              type="date"
              onChange={handlestartdate}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="end-date"
            >
              End Date
            </label>
            <input
              id="end-date"
              type="date"
              onChange={handleenddate}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="text-center">
            <input
              type="submit"
              value="Check"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
          </div>
        </form>

        <Doughnut
          id="chart-pie"
          data={studentcount}
          legendVisiblity
          height="full"
        />
      </div>
    </>
  );
};

export default AttendPie;

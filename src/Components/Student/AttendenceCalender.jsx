import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Button from '@mui/material/Button';
import '../../App.css'; // Import your CSS file
import { getAttendance, postAttendance } from './apiServices'; // Adjust the import path
import { errorToastify, successToastify } from './toastify';

function App({data}) {
  const [date, setDate] = useState(new Date());
  const [attendance, setAttendance] = useState({});
  const [attendanceSubmitted, setAttendanceSubmitted] = useState(false);

  useEffect(() => {
    const updateDate = () => {
      const newDate = new Date();
      setDate(newDate);
    };

    // Initially update the date
    updateDate();

    // Set a timer to update the date every 24 hours
    const interval = setInterval(updateDate, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed, so we add 1 to get the actual month.
    const currentDateOfMonth = currentDate.getDate();


    console.log(`year=${currentYear}&month=${currentMonth}&date=${currentDateOfMonth}`);
    console.log(data._id,'date');

    getAttendance(`year=${currentYear}&month=${currentMonth}&date=${currentDateOfMonth}`,data._id)
    
    .then((res)=>{
      console.log(res,'rrrr');
    })

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, []);

  const handlePresent = () => {
    if (!attendanceSubmitted) {

      console.log('insdie fun');
      const currentDate = date.toDateString();
      const newAttendanceData = { ...attendance, [currentDate]: 'present' };
      setAttendance(newAttendanceData);
      setAttendanceSubmitted(true);

      let attendanceStatus ={
        isPresent:true,
        ...data,
        isDate : new Date ()   
      }
      // Pass the data to the database via an API service
      postAttendance(attendanceStatus).then((res)=>{
        successToastify('status updated');

      }).catch((err)=>{
        errorToastify(err?.message);

      });
      console.log(attendanceStatus,"hello");
    }
  };

  const handleAbsent = () => {
    if (!attendanceSubmitted) {
      const currentDate = date.toDateString();
      const newAttendanceData = { ...attendance, [currentDate]: 'absent' };
      setAttendance(newAttendanceData);
      setAttendanceSubmitted(true);
      let attendanceStatus ={
        isPresent:false,
        ...data,
        isDate : new Date ()   
      }
      console.log(attendanceStatus,'dd');
      // Pass the data to the database via an API service
      postAttendance(attendanceStatus).then((res)=>{
        successToastify('status updated');
      

      }).catch((err)=>{
        errorToastify(err?.message);

      });
    }
  };

  return (
    <div className="app">
      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
          minDate={new Date()}
          maxDate={new Date()}
          tileClassName={({ date }) => {
            const currentDate = date.toDateString();
            if (attendance[currentDate] === 'present') {
              return 'present';
            } else if (attendance[currentDate] === 'absent') {
              return 'absent';
            }
            return null;
          }}
        />
      </div>
      <div className="attendance-buttons">
        <Button
          variant="contained"
          color="primary"
          onClick={handlePresent}
          disabled={attendanceSubmitted}
          sx={{
            marginLeft: '6rem',
            marginTop: '3rem',
            marginRight: '2rem',
            backgroundColor: attendance[date.toDateString()] === 'present' ? 'green' : '',
          }}
        >
          Present
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAbsent}
          disabled={attendanceSubmitted}
          sx={{
            marginTop: '3rem',
            backgroundColor: attendance[date.toDateString()] === 'absent' ? 'red' : '',
          }}
        >
          Absent
        </Button>
      </div>
      <div className="attendance-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(attendance).map(([attendanceDate, status], index) => (
              <tr key={index}>
                <td>{attendanceDate}</td>
                <td>{status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
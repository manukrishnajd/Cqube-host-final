import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import Button from '@mui/material/Button'
import '../../App.css' // Import your CSS file
import { getAttendance, getattendencebyid, postAttendance } from './apiServices' // Adjust the import path
import { errorToastify, successToastify } from './toastify'

function App({ data }) {
  const [date, setDate] = useState(new Date())
  const [attendance, setAttendance] = useState({})
  const [attendanceSubmitted, setAttendanceSubmitted] = useState(false)
  const [attend, setattend] = useState([])
  const [attenddata, setattenddata] = useState([])

  useEffect(async () => {
    let response = await getattendencebyid()
    console.log(response, 'attendence data')
    setattenddata(response)
  }, [])

  attenddata.map((item) => {
    console.log(item.isDate, 'datas')
    console.log(item.isPresent, 'datas')
  })

  useEffect(() => {
    const updateDate = () => {
      const newDate = new Date()
      setDate(newDate)
    }

    // Initially update the date
    updateDate()

    // Set a timer to update the date every 24 hours
    const interval = setInterval(updateDate, 24 * 60 * 60 * 1000) // 24 hours in milliseconds

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth() + 1 // Months are 0-indexed, so we add 1 to get the actual month.
    const currentDateOfMonth = currentDate.getDate()

    console.log(
      `year=${currentYear}&month=${currentMonth}&date=${currentDateOfMonth}`
    )
    console.log(data._id, 'date')

    getAttendance(
      `year=${currentYear}&month=${currentMonth}&date=${currentDateOfMonth}`,
      data._id
    ).then((res) => {
      console.log(res, 'rrrr')
      setattend(res)
      console.log(attend, 'attendence data')
    })

    return () => {
      clearInterval(interval) // Clean up the interval when the component unmounts
    }
  }, [])

  const handlePresent = () => {
    if (!attendanceSubmitted) {
      console.log('insdie fun')
      const currentDate = date.toDateString()
      const newAttendanceData = { ...attendance, [currentDate]: 'present' }
      setAttendance(newAttendanceData)
      setAttendanceSubmitted(true)

      let attendanceStatus = {
        isPresent: true,
        ...data,
        isDate: new Date(),
      }
      // Pass the data to the database via an API service
      postAttendance(attendanceStatus)
        .then((res) => {
          successToastify('status updated')
        })
        .catch((err) => {
          errorToastify(err?.message)
        })
    }
  }

  const handleAbsent = () => {
    if (!attendanceSubmitted) {
      const currentDate = date.toDateString()
      const newAttendanceData = { ...attendance, [currentDate]: 'absent' }
      setAttendance(newAttendanceData)
      setAttendanceSubmitted(true)
      let attendanceStatus = {
        isPresent: false,
        ...data,
        isDate: new Date(),
      }
      console.log(attendanceStatus, 'dd')
      // Pass the data to the database via an API service
      postAttendance(attendanceStatus)
        .then((res) => {
          successToastify('status updated')
        })
        .catch((err) => {
          errorToastify(err?.message)
        })
    }
  }

  const dateIsPresent = (dateToCheck) => {
    const formattedDateToCheck = new Date(dateToCheck).toDateString()

    return attenddata.some((item) => {
      const formattedItemDate = new Date(item.isDate).toDateString()
      return formattedItemDate === formattedDateToCheck && item.isPresent
    })
  }
  return (
    <div className="app">
      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
          minDate={new Date()}
          maxDate={new Date()}
          tileClassName={({ date }) => {
            if (dateIsPresent(date.toDateString())) {
              return 'present'
            } else {
              return 'absent'
            }
          }}
        />
      </div>
      <div
        className="attendance-buttons"
        style={{
          marginTop: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handlePresent}
          disabled={attendanceSubmitted}
          sx={{
            backgroundColor:
              attendance[date.toDateString()] === 'present' ? 'green' : '',
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
            backgroundColor:
              attendance[date.toDateString()] === 'absent' ? 'orange' : '',
          }}
        >
          Absent
        </Button>
      </div>
    </div>
  )
}

export default App

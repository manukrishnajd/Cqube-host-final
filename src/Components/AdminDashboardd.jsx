import React, { useEffect, useState } from 'react'
import SummaryCards from './dashboard component/SummaryCards'
import { GoPrimitiveDot } from 'react-icons/go'
import StudentChart from './dashboard component/StudentsChart'
import TrainerChart from './dashboard component/TrainersChart'
import Pie from '../Pages/Charts/StudentCourseChart'
import { getgraphdata } from '../service/apiService'
import Loader from './Loader'

const AdminDash = () => {
  const [data, setdata] = useState()
  const [studentData, setStudentData] = useState()
  const [trainerData, setTrainerData] = useState()
  const [loading, setLoading] = useState()

  useEffect(() => {
    setLoading(true);
    let date = new Date()
    getgraphdata(date.getFullYear()).then((res) => {
      setdata(res)
    setLoading(false);

    }).catch(()=>{
    setLoading(false);

    })
  }, [])

  useEffect(() => {
    if (data) {
      const updatedStudentData = data.map((item) => ({
        month: item.month,
        count: item.students.length, // Get the number of students for each month
      }))

      const updatetrainerData = data.map((item) => ({
        month: item.month,
        count: item.trainers.length,
      }))

      setStudentData(updatedStudentData)
      setTrainerData(updatetrainerData)
    }
  }, [data])

  const [year, setyear] = useState()
  let handlechange = (e) => {
    setyear(e.target.value)
  }

  let handlesubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setyear(year)
    getgraphdata(year).then((res) => {
      console.log(res)
      setdata(res)
      setLoading(false)

    }).catch(()=>{
      setLoading(false)
    })
  }

  return (
    <div className=" gap-1 flex-wrap justify-center  grid grid-cols-1">
      {
        loading ? <Loader/> :
      
      <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-700">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
              <span>
                <GoPrimitiveDot />
              </span>
            </p>
            <p className="flex items-center gap-2 text-orange-400 hover:drop-shadow-xl">
              <span>
                <GoPrimitiveDot />
              </span>
            </p>
          </div>
        </div>

        <div className=" grid grid-cols-1">

          <form className="flex gap-2 p-3" onSubmit={handlesubmit}>
            <input
              type="number"
              className="border-2 p-2 rounded-lg"
              placeholder="enter year"
              onChange={handlechange}
            />
            <input
              type="submit"
              className="bg-gray-600 text-white ps-5 pe-5 text-[20px] rounded hover:bg-gray-900 ml-2"
              value="search"
            />
          </form>
          <div className=" flex justify-center">
            <TrainerChart width="300px" height="300px" data={trainerData} />
            <StudentChart width="300px" height="300px" data={studentData} />
          </div>
          <div className=" flex-col justify-center text-center">
            <SummaryCards />
            <Pie />
            {/* <PresentAbsent /> */}
          </div>

          <div></div>
        </div>
      </div>
      }
    </div>
  )
}

export default AdminDash

import React, { useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";
import { Header } from "../Components";
import { useEffect } from "react";
import { addTrainer, viewbranch ,getCourse, getAllTrainers, updateTrainer } from "../service/apiService";

const Trainers = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [branchRef, setBranch] = useState("");
  const [courseRef, setCourse] = useState("");
  const [gridData, setGridData] = useState();
  const [joinedDate, setJoinedDate] = useState();

  const [data, setdata] = useState([]);

  const handleAddTrainer = () => {
    const newTrainer = {
      name,
      password,
      phoneNumber,
      email,
      branchRef,
      joinedDate,
      courseRef,
    };

    addTrainer(newTrainer);

    setGridData(data);
    clearFields();
  };

  const clearFields = () => {
    setName("");
    setPhone("");
    setEmail("");
    setBranch("");
    setCourse("");
  };

  const gridColumns = [
    { field: "name", headerText: "Name", width: 100 },
    { field: "phone", headerText: "Phone", width: 100 },
    { field: "email", headerText: "Email", width: 100 },
    { field: "branch", headerText: "Branch", width: 100 },
    { field: "course", headerText: "Course", width: 100 },
  ];


  useEffect(() => {
    viewbranch().then((res) => {
      console.log("res", res);
      setdata(res);
    });
  }, []);

  const [course_data, setCourseData] = useState([]);

  useEffect(() =>{
    getCourse().then((res)=>{
      setCourseData(res)
    })
    getAllTrainers()
  } ,[]);
  
  console.log("vimalresponse",course_data);
  // console.log(data._id, "datas");

  return (
    <div className="container mx-auto p-10 bg-white rounded-3xl">
      <Header category="Page" title="Trainers" />

      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Trainer Profile Management</h1>

        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Add Trainer</h2>
          <div className="flex flex-wrap mb-4">
            <input
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="Phone"
              value={phoneNumber}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              type="date"
              placeholder="date"
              value={joinedDate}
              onChange={(e) => setJoinedDate(e.target.value)}
            />
            <select
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              value={branchRef}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option value="" disabled>
                Select Branch
              </option>
              {/* {data?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))} */}
            </select>

            <select
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              value={courseRef}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="" disabled>
                Select Course
              </option>
              {/* {
                course_data?.map((item)=>{
                  return(
                    <>
                      <option key={item?._id}   value={item?._id}>{item?.name}</option>
                    </>
                  )
                })
              } */}
              {/* <option value="Course 2">Course 2</option> */}
            </select>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
            onClick={handleAddTrainer}
          >
            Add Trainer
          </button>
        </div>

        <GridComponent
          dataSource={gridData}
          allowPaging
          allowSorting
          toolbar={["Delete"]}
          editSettings={{ allowDeleting: true }}
          width="auto"
        >
          <ColumnsDirective>
            {gridColumns?.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Page, Toolbar, Edit, Sort]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default Trainers;

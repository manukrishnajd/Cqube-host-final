import React, { useEffect, useState } from 'react'
import { Addnotification, deletenotification, getAllBranches, getAllTrainers, getStudent, getnotification } from '../service/apiService';
import { errorToastify } from '../Components/Student/toastify';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Button,
    TextField,
  } from "@material-ui/core";
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
const AddNotification = () => {

    const [branch,setbranch]=useState([])
    const [student,setstudent]=useState([])
    const [trainer,settrainer]=useState([])
    const [data,setdata]=useState([])
    const [notify,setnotify]=useState([])
    const [refresh,setrefresh]=useState(false)

const handlechange=(e)=>{
    setdata({...data,[e.target.name]:e.target.value})
}

const handledelete=(id)=>{
    try{

        deletenotification(id).then((res)=>{
            toast('deleted')
        })
        setrefresh(!refresh)
    }
    catch(err){
        errorToastify(err)
    }


}
const handlesubmit = (e) => {
    e.preventDefault();

    try{
    
    // Get the 'id' from local storage
    const aid = localStorage.getItem('id');
    
    // Create the data object with 'sender' set to 'aid'
    const payload = {
      ...data,
      sender: aid
    };
  
    // Call the Addnotification function with the modified payload
    let res=Addnotification(payload)
    console.log(res,'res of notifi');
    setrefresh(!refresh)
}catch(err){
    errorToastify(err)
}
  };
useEffect(()=>{

    getdata()
},[refresh])
let getdata=async()=>{
        
    const response = await getAllBranches();
    setbranch(response)
    const trainerres=await getAllTrainers()
    settrainer(trainerres)
    const setstudentres=await getStudent()
    setstudent(setstudentres)
    let notifydata=await getnotification()
    setnotify(notifydata)

}

console.log(notify,'notification');
const tableHeaders = [
    "Message",
    "Reciever",
    "Date",
    ""
   
  ];
  return (
    <div className=' rounded-2xl flex flex-wrap text-center items-center mb-4 gap-6 bg-slate-400 p-4 p-10 text-black'>
        <form onSubmit={handlesubmit}>
     

      <input type="text" className='w-400 p-4 mb-2 me-2  border rounded h-10' placeholder='message' name="message" id="" onChange={handlechange} />
        
<br />
      <select name="receiver" className='w-400 me-2  mb-2 ms-2 border rounded h-10' onChange={handlechange}  id="">

        <option value="">select branch</option>
{branch.map((item)=>(
    <option value={item._id}>{item.name}</option> 
    ))}
      </select>
  
      <select name="receiver" id="" className='w-400  mb-2  border rounded h-10'  onChange={handlechange}>

<option value="">select student</option>
{student.map((item)=>(
    <option value={item._id}>{item.name}</option> 
    ))}
</select>
    

      <select name="receiver" className='w-400  mb-2  border rounded h-10' id=""  onChange={handlechange}>

<option value="">select trainer</option>
{trainer.map((item)=>(
    <option value={item._id}>{item.name}</option> 
    ))}
</select><br />
    <input type="submit" className='bg-slate-600 hover:bg-black text-white ps-4 pe-4 pt-2 pb-2 rounded w-400' value='Send'/>
    </form>

    <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="h-fit">
                {tableHeaders.map((header, index) => (
                  <TableCell
                    key={index}
                    style={{
                      backgroundColor: "#475569",
                      fontSize: "17px",
                      color: "white",
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className="text-lg">
              {notify.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.message}</TableCell>
                  <TableCell>
                    {student?.reciever?.map((course, index) => (
                      <span key={index}>{course.name}</span>
                    ))} 
                  </TableCell>
                  <TableCell>{new Date(student.date).toLocaleDateString('en-GB')}</TableCell>
                  <TableCell>
                    
                      <IconButton
                        size="small"
                        title="View more"
                        onClick={() => handledelete(student._id)}
                      >
                        <AiFillDelete size={25} />
                      </IconButton>
                  
              
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>





    </div>
  )
}

export default AddNotification

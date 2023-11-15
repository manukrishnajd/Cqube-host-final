import React, { useState } from 'react'
import { addrequest } from '../service/apiService'

const AdminViewSupport = () => {

    const [data,setdata]=useState()

    let onchange=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    }
    let handlesubmit=(e)=>{
        e.preventDefault()
        addrequest(data).then((res)=>{
            console.log(res);
        })
     
    }
  return (
    <div className="absolute top-0 right-0 mt-20 bg-white border border-gray-300 p-4 rounded-lg shadow-lg">

        <form className='flex flex-wrap gap-3' onSubmit={handlesubmit}>
      <input className='border-1 rounded-lg ps-3 text-[18px]' type="text" name="name" placeholder='Name' onChange={onchange} id="" />
      <input className='border-1 rounded-lg ps-3 text-[18px]' type="text" name="email" placeholder='email' onChange={onchange} id="" />
      <input className='border-1 rounded-lg ps-3 text-[18px]' type="text" name="phoneNumber" placeholder='Phone Number' onChange={onchange} id="" />
      <input type="submit" className='bg-slate-600 w-fit ps-4 pe-4 rounded-lg text-[20px] text-white hover:bg-slate-700' />
        </form>
    </div>
  )
}

export default AdminViewSupport

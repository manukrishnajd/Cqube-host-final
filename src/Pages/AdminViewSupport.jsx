import React, { useEffect, useState } from 'react'
import {viewrequestadmin } from '../service/apiService'
import { MdOutlineEmail } from 'react-icons/md'
import { FaPhoneAlt } from 'react-icons/fa'

const AdminViewSupport = () => {

    const [data,setdata]=useState([])
    const [refresh,setrefresh]=useState(false)

   useEffect(()=>{

    viewrequestadmin().then((res)=>{
      console.log(res,'responses');
      setdata(res.result)
    })

   },[refresh])
  
  let handledelete=()=>{
setrefresh(!refresh)
  } 
  return (
    <div className='flex   flex-wrap gap-4'>
      

{data?.map((item)=>(
  <>
  <div>
       <div class="w-fit rounded  bg-white overflow-hidden shadow-xl">
  {/* <img class="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"/> */}
  <div class="px-6 py-4">
    <div class="font-bold w-[200px] text-xl mb-2">{item.name}</div><br />
    <div class="text-gray-700 text-base flex gap-3 mb-4 items-center">
    <span><MdOutlineEmail/></span><span> {item.email}</span>
    </div>
    <div class="text-gray-700  mb-3 text-base flex gap-3">
    <span><FaPhoneAlt/></span><span>{item.phoneNumber}</span>
    </div>
    <div className='text-center pt-[20px]'>
    <button onClick={handledelete}><span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Delete</span>
    </button>
    </div>
  </div>
  <div class="px-6 pt-4 pb-2">
   
    
  </div>
</div>
    </div>
  </>
))}
       
    </div>
  )
}

export default AdminViewSupport

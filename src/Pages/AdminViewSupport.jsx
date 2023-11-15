import React, { useEffect, useState } from 'react'
import {viewrequestadmin } from '../service/apiService'
import { MdOutlineEmail } from 'react-icons/md'
import { FaPhoneAlt } from 'react-icons/fa'

const AdminViewSupport = () => {

    const [data,setdata]=useState([])

   useEffect(()=>{

    viewrequestadmin().then((res)=>{
      console.log(res,'responses');
      setdata(res.result)
    })

   },[])
  
  return (
    <div className='flex   flex-wrap gap-4'>
      

{data?.map((item)=>(
  <>
  <div>
       <div class="w-fit rounded  bg-white overflow-hidden shadow-xl">
  {/* <img class="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"/> */}
  <div class="px-6 py-4">
    <div class="font-bold w-[200px] text-xl mb-2">{item.name}</div><br />
    <p class="text-gray-700 text-base flex gap-3 items-center">
    <span><MdOutlineEmail/></span><span> {item.email}</span>
    </p><br />
    <p class="text-gray-700 text-base flex gap-3">
    <span><FaPhoneAlt/></span><span>{item.phoneNumber}</span>
    </p>
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

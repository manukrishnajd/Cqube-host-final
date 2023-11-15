import React, { useEffect, useState } from 'react'
import {viewrequestadmin } from '../service/apiService'

const AdminViewSupport = () => {

    const [data,setdata]=useState([])

   useEffect(()=>{

    viewrequestadmin().then((res)=>{
      console.log(res,'responses');
      setdata(res.resultn)
    })

   },[])
  
  return (
    <div className="absolute top-0 right-0 mt-20 bg-white border border-gray-300 p-4 rounded-lg shadow-lg">

{data?.map((item)=>(
  <>
 <span> {item?.name}</span>
 <span> {item?.email}</span>
  <span>{item?.phoneNumber}</span>
  </>
))}
       
    </div>
  )
}

export default AdminViewSupport

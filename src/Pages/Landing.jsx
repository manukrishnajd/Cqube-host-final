import React from 'react'
import image from '../../src/landImage.png'
import logo from '../../src/logo.png'
import st from '../../src/studenticon.png'
import placed from '../../src/placedicon.png'
import python from '../../src/python.png'
import android from '../../src/android.png'
import figma from '../../src/figma.png'
import java from '../../src/java.png'
import dotnet from '../../src/dotnet.png'
import { BiSupport } from 'react-icons/bi';
import { IoIosNotifications } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../auth/Login'
import { useState } from 'react'
import { addrequest } from '../service/apiService'
import { errorToastify, successToastify } from '../Components/Student/toastify'




const icons=[python,android,figma,java,dotnet]
const Landing = () => {

        const [isSupportOpen, setIsSupportOpen] = useState(false);

        const openSupport = () => {
          setIsSupportOpen(!isSupportOpen);
        };
      
        const [data,setdata]=useState()
        const[open,setopen]=useState(true)
    
        let onchange=(e)=>{
            setdata({...data,[e.target.name]:e.target.value})
        }
        let handlesubmit=(e)=>{
            e.preventDefault()
            try{
    
              addrequest(data).then((res)=>{
                console.log(res);
              })
              setopen(false)
        
              successToastify('succesful')
              setIsSupportOpen(!isSupportOpen)
            }catch(err){
              errorToastify(err)
            }
         
        }
        const navigate=useNavigate()
  return (
   <>

        <div className='flex bottom justify-between pl-20 pr-24 items-center'>
            <img src={logo} width="150px" alt="" />
            <div className='flex items-center '>
        <button
          onClick={openSupport}
  
          className="focus:outline-none"
        >
          <BiSupport className='pr-5 bg ' size={50} />
        </button>



            <IoIosNotifications className='pr-5 bg' size={50}/>
            <div className='flex gap-6'>

            <Link to='/login'><button className='loginbt'>Login</button></Link>
            <Link to='/trainerlogin'><button className='loginbt'>Trainer Login</button></Link>
            </div>
            </div>
        </div>
        {isSupportOpen && 
        <>

         <div className="absolute top-0 right-0 mt-20 bg-white border border-gray-300 p-4 rounded-lg shadow-lg">
         {open &&
                 <form className='flex flex-wrap gap-3' onSubmit={handlesubmit}>
               <input className='border-1 rounded-lg ps-3 text-[18px]' type="text"  name="name" placeholder='Name' onChange={onchange} id="" />
               <input className='border-1 rounded-lg ps-3 text-[18px]' type="text"  name="email" placeholder='email' onChange={onchange} id="" />
               <input className='border-1 rounded-lg ps-3 text-[18px]' type="text"  name="phoneNumber" placeholder='Phone Number' onChange={onchange} id="" />
               <input type="submit" className='bg-slate-600 w-fit ps-4 pe-4 rounded-lg text-[20px] text-white hover:bg-slate-700' />
                 </form>
         }
             </div>
        
        
        </>
    }
  

    <div className=' flex flex-wrap justify-center'>
        <div className=' text-center font mt-3'>
      <span className='intern'>Intern</span> <br /><span className='track'>Tracking System</span>
      <p className='para'>Nurturing Talent from Within</p>
      <div className='achievement'>
       <span className='achieved'> <span className='achieve'>Our Achiev</span>ments</span><br/>
        <div className='flex topdown'>
<div className='side flex flex-wrap align-middle'>

        <img src={st} className='studentIcon' alt=""/>
        <div className='flex flex-col'>

        <span className='students'>500<span className=''>+</span></span>
        <span className='size'>Happy students</span>
        </div>
</div>
<div className='side flex flex-wrap'>

        <img src={placed}className='studentIcon' alt=""/>
        <div className='flex flex-col'>
                <span className='students'>300+ </span>
        <span className='size'>Placements</span>
                </div>
        
</div>
        </div>
      </div>
        </div>
        <div className='backimage'>
<img src={image} className='images' width='660px' alt="" />
        </div>
    </div>
    <div className='flex flex-wrap justify-center gap-10 mt-7'>
{icons.map((value)=>(

<img className='p-5 course' src={value}></img>

))}

    </div>
       </>
  )
}

export default Landing

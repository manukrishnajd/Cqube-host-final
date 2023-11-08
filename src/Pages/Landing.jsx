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


const icons=[python,android,figma,java,dotnet]
const Landing = () => {
        const navigate=useNavigate()
  return (
   <>

        <div className='flex bottom justify-between pl-20 pr-24 items-center'>
            <img src={logo} width="150px" alt="" />
            <div className='flex items-center '>
            <BiSupport className='pr-5 bg ' size={50}/>
            <IoIosNotifications className='pr-5 bg' size={50}/>
            <div className='flex gap-6'>

            <Link to='/login'><button className='loginbt'>Login</button></Link>
            <Link to='/trainerlogin'><button className='loginbt'>Trainer Login</button></Link>
            </div>
            </div>
        </div>
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

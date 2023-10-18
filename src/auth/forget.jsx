import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  "./Login.css";
import logo from '../../src/logo.png'
import { BiSupport } from 'react-icons/bi';
import { IoIosNotifications } from 'react-icons/io';
import axios from 'axios';
import { login } from '../Components/Student/apiServices';

const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin=()=>{
       
  }








return (
  <>
    <div className='flex flex-wrap bottom justify-between pl-20 pr-24 items-center'>
      <Link to='/'><img src={logo} width="150px" alt="" /></Link>
      <div className='flex items-center '>
        <BiSupport className='pr-5 bg ' size={50} />
        <IoIosNotifications className='pr-5 bg' size={50} />
      </div>
    </div>

    <div className="min-h-screen margin flex flex-wrap justify-evenly items-center  bg-ash-400">
      <div class="box">
        <div class="form">
          <h2 className="text-2xl font-bold mb-4 text-center mt-4">Forget password</h2>
          <form className='loginHome'>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 loginInput rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="phone number"
                placeholder="PhoneNumber"
                className="w-full p-2 loginInput rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
            
            
          </form>

        </div>
      </div>
    </div>
  </>
);
};

export default Login;

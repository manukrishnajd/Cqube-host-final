import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";
import logo from '../../src/logo.png'
import { BiSupport } from 'react-icons/bi';
import { IoIosNotifications } from 'react-icons/io';
import axios from "axios"
import { login } from '../service/trainerService';


const TrainerLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false); // State for authentication error

  const handleLogin = async () => {
    const data = { email: email, password: password };
    try {
      const response = await login(data);
      console.log(response, 'response');
      if (response && response.token) {
        navigate('/trainer/activity');
        window.location.reload()

      } else {
        console.log('Authentication failed');
        setAuthError(true); // Set authError to true when authentication fails
      }
    } catch (error) {
      console.error('Login error', error);
      setAuthError(true); // Set authError to true when there's an error
    }
  };

  return (
    <>
      <div className='flex flex-wrap bottom justify-between pl-20 pr-24 items-center'>
        <Link to='/'><img src={logo} width="150px" alt="" /></Link>
        <div className='flex items-center '>
          {/* <BiSupport className='pr-5 bg ' size={50} />a */}
        </div>
      </div>

      <div className="min-h-screen margin flex flex-wrap justify-evenly items-center  bg-ash-400">
        <div class="box">
          <div class="form">
            <h2 className="text-2xl font-bold mt-8 font text-center ">Trainer Login</h2>
            <form className='loginHome'>
              <div className="mb-7">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 loginInput rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-7">
                <input
                  type="password"
                  placeholder="Password"
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

              {authError && (
                <span className='text-red-500 font-bold text-sm'>! Invalid email or password</span>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainerLogin;

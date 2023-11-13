import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import "./Login.css";
import logo from '../../src/logo.png';
import { BiSupport } from 'react-icons/bi';
import { IoIosNotifications } from 'react-icons/io';

// Replace this import with your actual API service
import { resetPassword } from '../Components/Student/apiServices';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Get the navigate function

  const token = localStorage.getItem('token');

  const handleReset = (e) => {
    e.preventDefault();

    const requestData = {
      token: token,
      password: password,
    };

    console.log(requestData);

    resetPassword(requestData);

    // Navigate back to the login form
    navigate('/login'); // You can specify the correct path for your login form
  };

  return (
    <>
      <div className='flex flex-wrap bottom justify-between pl-20 pr-24 items-center'>
        <Link to='/'><img src={logo} width="150px" alt="" /></Link>
        <div className='flex items-center '>
          <BiSupport className='pr-5 bg' size={50} />
          <IoIosNotifications className='pr-5 bg' size={50} />
        </div>
      </div>

      <div className="min-h-screen margin flex flex-wrap justify-evenly items-center bg-ash-400">
        <div className="box">
          <div className="form">
            <h2 className="text-2xl font-bold mb-4 text-center mt-4">Forget password</h2>
            <form className='loginHome' onSubmit={handleReset}>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Create New Password"
                  className="w-full p-2 loginInput rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 hover-bg-orange-600 text-white font-bold py-2 px-4 rounded"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

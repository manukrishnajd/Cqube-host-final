import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Login.css";
import logo from '../../src/logo.png';
import { BiSupport } from 'react-icons/bi';
import { IoIosNotifications } from 'react-icons/io';
import axios from 'axios';

// Replace this import with your actual API service
import { forgetPassword } from '../Components/Student/apiServices';

const Login = () => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [student, setStudent] = useState(''); // New state for "Student" input

  const handleLogin = () => {
    // Create a data object to send to the API
    const requestData = {
      email: email,
      phoneNumber: phoneNumber,
      isUserType: student, // Include "student" in the data object
    };

    // Call the forgetPassword API with the requestData
    forgetPassword(requestData)
      .then(response => {
        // Handle the API response here
        console.log('Password reset request successful:', response);
        localStorage.setItem('token',response.token)
      })
      .catch(error => {
        // Handle API errors here
        console.error('Password reset request failed:', error);
      });
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

      <div className="min-h-screen margin flex flex-wrap justify-evenly items-center bg-ash-400">
        <div className="box">
          <div className="form">
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
                  type="tel" // Use type="tel" for phone number input
                  placeholder="Phone Number"
                  className="w-full p-2 loginInput rounded"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text" // Use type="text" for student input
                  placeholder="Student"
                  className="w-full p-2 loginInput rounded"
                  value={student}
                  onChange={(e) => setStudent(e.target.value)}
                />
              </div>
              <Link to='/ResetPassword'>
              <button
                type="button"
                onClick={handleLogin}
                className="w-full bg-orange-500 hover-bg-orange-600 text-white font-bold py-2 px-4 rounded"
              >
                Reset Password
              </button>
              
              </Link>
           
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

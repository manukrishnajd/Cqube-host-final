import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  "./Login.css";
import logo from '../../src/logo.png'
import { loginAdmin } from '../service/apiService';
import { errorToastify } from '../Components/Student/toastify';

const AdminLogin = () => {
  const navigate = useNavigate();


  //state for email and password
  const [authData, setAuthData] = useState(
    {
      email:null,
      password:null
    }
    );
    // state for while click disable loading
    const [disabledOfWhileLoading, setDisabledOfWhileLoading] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault()

    if(!authData.email){
     errorToastify('Email required')
    }
    if(!authData.password){
      errorToastify('password required')
    }
    setDisabledOfWhileLoading(true)

    try {
      const response = await loginAdmin(authData);

      if(response.token && localStorage.getItem("token") && localStorage.getItem("id") ){

        navigate('/admin/dash');
      //     window.location.reload()

      }
      setDisabledOfWhileLoading(false)
    } catch (error) {
      errorToastify(error.message)
      setDisabledOfWhileLoading(false)
    }
  };


  const handleChange = (event) =>{
    const { value, name } = event.target
    setAuthData({...authData,[name]:value})
  }

  return (
    <>
      <div className='flex flex-wrap bottom justify-between pl-20 pr-24 items-center'>
        <Link to='/'><img src={logo} width="150px" alt="" /></Link>
        <div className='flex items-center '>
        </div>
      </div>
      <div className="min-h-screen margin flex flex-wrap justify-evenly items-center  bg-ash-400">
        <div class="box">
          <div class="form">
            <h2 className="text-2xl font-bold text-center mt-4">Admin Login</h2>
            <form className='loginHome' onSubmit={handleLogin}>
              <div className="mb-7">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 loginInput rounded"
                  value={authData.email}
                  required
                  name='email'
                  onChange={handleChange}
                />
              </div>
              <div className="mb-7">
                <input
                  type="password"
                  required
                  placeholder="Password"
                  name='password'
                  className="w-full p-2 loginInput rounded"
                  value={authData.password}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                style={disabledOfWhileLoading ? { opacity:"0.2"} : { opacity:"1"}}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                disabled={disabledOfWhileLoading}
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

export default AdminLogin;

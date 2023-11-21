import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  "./Login.css";
import logo from '../../src/logo.png'
import { BiSupport } from 'react-icons/bi';
import { IoIosNotifications } from 'react-icons/io';
import { loginAdmin } from '../service/apiService';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [auth, setAuth] = useState(false);
  const [disabledOfWhileLoading, setDisabledOfWhileLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault()

    if(!(email || password)){
      return alert("field is empty")
    }

    setDisabledOfWhileLoading(true)
 
    const data = { email: email, password: password };
     
    try {
      const response = await loginAdmin(data);
      if (response && response.token) {
        navigate('/admin/dash');
      }
      setDisabledOfWhileLoading(false)
    } catch (error) {
      setMessage(error.message)
    setDisabledOfWhileLoading(false)

      setAuth(true);
    }
  };

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
            <h2 className="text-2xl font-bold mt-7 text-center mt-4">Admin Login</h2>
            <form className='loginHome' onSubmit={handleLogin}>
              <div className="mb-7">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 loginInput rounded"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-7">
                <input
                  type="password"
                  required
                  placeholder="Password"
                  className="w-full p-2 loginInput rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={disabledOfWhileLoading}
                style={disabledOfWhileLoading ? { opacity:"0.2"} : { opacity:"1"}}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </button>
          
            </form>

            {auth && (
              <p className="text-red-500 text-center">{message}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;

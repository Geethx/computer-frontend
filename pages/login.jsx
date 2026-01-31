import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const navigate = useNavigate();

  // function login(){
  //     axios.post("http://localhost:3000/users/login",
  //     {
  //       email : email,
  //       password : password
  //     }
  //     ).then(
  //       () => {
  //         console.log("Login Successfull!")
  //       }
  //     ).catch(
  //       (error) => {
  //         console.log(error)
  //       }
  //     )
  // }

  async function login() {
      try {
        const response = await axios.post(import.meta.env.VITE_API_URL + "/users/login",
          {
            email : email,
            password : password
          }
        )
        console.log(response)
        localStorage.setItem("token", response.data.token)
        if(response.data.role == "admin"){
            navigate("/admin")
        }else
            navigate("/")
          toast.success("Login Successful!")
      } catch (error) {
        console.log(error)
        console.log("Login Failed")
        toast.error("Login Failed")
      }
  }

  return (
    <div className="bg-[url('/background.jpg')] bg-cover bg-no-repeat bg-center flex justify-center items-center text-primary w-full h-full">
        
        <div className="w-[50%] h-full flex flex-col justify-center items-center">
          <img src="/logo.png" alt="logo" className='w-[300px]'/>
          <h1 className='text-4xl text-secondary font-bold mt-5'>Build Your Future!</h1>
        </div>

        <div className="w-[50%] h-full flex justify-center items-center">
          <div className="w-[450px] h-[600px] bg-gray-600 backdrop-blur-2xl shadow-2xl rounded-lg flex flex-col justify-center items-center">

            <input 
            onChange={
              e =>
                setEmail(e.target.value)
             }
            type="email" placeholder="Email" className="m-5 p-3 w-[90%] h-[50px] rounded-lg border border-secondary outline-none"/>
            <input 
            onChange={
              e => setPassword(e.target.value)
            }
            type="password" placeholder="Password" className="m-5 p-3 w-[90%] h-[50px] rounded-lg border border-secondary outline-none"/>
            <p className='w-full text-right pr-5'>Forgot Password <Link to="/forgot-password" className="text-accent">Reset</Link></p>

            
            <button onClick={login} className="m-5 p-3 w-[90%] h-[50px] bg-accent rounded-lg text-white font-bold">Login</button>
            <button className="m-5 p-3 w-[90%] h-[50px] border border-accent rounded-lg text-white font-bold">Login with Google</button>
            <p className='w-full text-right pr-5'>Don't have an account? <Link to="/register" className="text-accent">Register</Link></p>

          </div>
        </div>
    
    </div>
  )
}

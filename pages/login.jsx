import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <div className="bg-[url('/background.jpg')] bg-cover bg-no-repeat bg-center flex justify-center items-center text-primary w-full h-full">
        
        <div className="w-[50%] h-full flex flex-col justify-center items-center">
          <img src="/logo.png" alt="logo" className='w-[300px]'/>
          <h1 className='text-4xl text-secondary font-bold mt-5'>Build Your Future!</h1>
        </div>

        <div className="w-[50%] h-full flex justify-center items-center">
          <div className="w-[450px] h-[600px] backdrop-blur-3xl shadow-2xl rounded-lg flex flex-col justify-center items-center">

            <input type="email" placeholder="Email" className="m-5 p-3 w-[90%] h-[50px] rounded-lg border border-secondary outline-none"/>
            <input type="password" placeholder="Password" className="m-5 p-3 w-[90%] h-[50px] rounded-lg border border-secondary outline-none"/>
            <p className='w-full text-right pr-5'>Forgot Password <Link to="/forgot-password" className="text-accent">Reset</Link></p>

            
            <button className="m-5 p-3 w-[90%] h-[50px] bg-accent rounded-lg text-white font-bold">Login</button>
            <button className="m-5 p-3 w-[90%] h-[50px] border border-accent rounded-lg text-white font-bold">Login with Google</button>
            <p className='w-full text-right pr-5'>Don't have an account? <Link to="/register" className="text-accent">Register</Link></p>

          </div>
        </div>
    
    </div>
  )
}

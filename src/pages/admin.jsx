import React from 'react'
import { Link, Route,  Routes } from 'react-router-dom'
import { FaRegListAlt } from "react-icons/fa"
import { MdOutlineInventory2 } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import AdminProductPage from './admin/adminProductsPage';
import AdminAddProductPage from './admin/adminAddProductPage';

export default function AdminPage() {
  return (
    <div className='w-full h-full flex bg-accent'>
        <div className='w-[300px] h-full bg-accent flex flex-col text-white'>
        <h1 className='text-4xl font-bold p-4 border-b-4'>Dashboard</h1>
        <Link className="flex w-full p-2.5 gap-3 items-center hover:bg-white hover:text-accent" to="/admin/users"><LuUsers /> Users</Link>
        <Link className="flex w-full p-2.5 gap-3 items-center hover:bg-white hover:text-accent" to="/admin"><FaRegListAlt />Orders</Link>
        <Link className="flex w-full p-2.5 gap-3 items-center hover:bg-white hover:text-accent" to="/admin/products"><MdOutlineInventory2 /> Products</Link>

        </div>

        <div className='w-[calc(100%-300px)] h-full bg-primary p-4 border-6 rounded-[15px] border-accent'>
            <Routes>
                <Route path='/' element={<h1>Admin Page</h1>} />
                <Route path='/products' element={<AdminProductPage />} />
                <Route path='/users' element={<h1>Users Page</h1>} />
                <Route path='/add-product' element={<AdminAddProductPage />} />

            </Routes>

        </div>
    
    </div>
    
  )
}

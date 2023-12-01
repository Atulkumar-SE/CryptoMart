import React from 'react'
import { AiFillDollarCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();
  return (
    <div className=' bg-gray-800 text-white h-14 flex items-center'>
        <div className='wrapper_container w-full flex items-center gap-3 ' onClick={() =>navigate('/')}>
            <AiFillDollarCircle className=' text-[2rem] text-yellow-300'/>
            <p className=' font-semibold text-[2rem]'><span className=' text-yellow-300'>C</span>rypto<span className=' text-yellow-300'>M</span>art</p>
        </div>
    </div>
  )
}

export default Navbar;
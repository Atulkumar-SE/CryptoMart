import React from 'react'
import './Navbar.css'
const Navbar = () => {
  return (
    <nav className='Project1_nav'>
        <div className="logo">
            <img src="/assets/vite.svg" alt="" />
        </div>
        <ul>
            <li href="#">Menu</li>
            <li href="#">Location</li>
            <li href="#">About</li>
            <li href="#">Contact</li>
        </ul>
        <button>Login</button>
    </nav>
  )
}

export default Navbar
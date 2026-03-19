import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <nav className='bg-cyan-400 flex items-center justify-around p-2'>
        <div className="logo font-bold ">pass man</div>
      <ul className='flex gap-4 text-white'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <button className='flex items-center bg-cyan-300 hover:bg-cyan-600 text-white font-bold p-0.5 rounded-lg'>
        <img src="/github.png" alt="git" className='w-10'/>
        <span className='mx-4'>Github</span>
      </button>
    </nav>
  )
}

export default Navbar

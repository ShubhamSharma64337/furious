import { useState } from 'react'

function Navbar() {
  return (
    <div className="container grid grid-cols-2 justify-around text-slate-800 py-5 px-10 align-middle">
        <div className="logo col">
            <div className='font-bold text-2xl'>
                Furious<span className='text-purple-500'>.</span>
            </div>
        </div>  
        <div className="menu col align-middle justify-end hidden sm:flex">
            <ul className='flex gap-x-4'>
                <li>Home</li>
                <li  className='underline underline-offset-2 decoration-purple-400'>Booking</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </div>
    </div>

  )
}

export default Navbar

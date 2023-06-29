import React from 'react'
import pfp from "../Images/cover.jpg"
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';






const Nav = () => {
  return (
    <div className='navbar'>
      <span className="logo">CODA</span>
      <div className="user">
        <img src={pfp} alt="" />
        <span>Name</span>
        <button onClick={() =>signOut(auth)}>Sign Out</button>
      </div>
    </div>
  )
}

export default Nav
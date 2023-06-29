import React from 'react'
import pfp from "../Images/cover.jpg"







const Nav = () => {
  return (
    <div className='navbar'>
      <span className="logo">CODA</span>
      <div className="user">
        <img src={pfp} alt="" />
        <span>Name</span>
        <button>Sign Out</button>
      </div>
    </div>
  )
}

export default Nav
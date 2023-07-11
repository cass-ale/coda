import React, { useContext } from 'react';
import Menu from './Menu';
import {HideContext} from "../context/HideContext"






const Navbar = () => {
  const { setShowChat } = useContext(HideContext);

  return (
    <div className='navbar'>
      <span className="logo" style={{cursor: "pointer"}} onClick={()=>{setShowChat(false)}}>CODA</span>
      <div className="user">
        <Menu />
      </div>
    </div>
  )
}

export default Navbar
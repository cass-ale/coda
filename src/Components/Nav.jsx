import React, { useContext, useRef, useState } from 'react';
import Menu from './Menu';
import { AuthContext } from '../context/AuthContext'
import {HideContext} from "../context/HideContext"





const Navbar = () => {
  const [full, setFull] = useState(false);
  const {currentUser} = useContext(AuthContext);
  const { setShowChat } = useContext(HideContext);
  const copy = async () => {
    let text = document.getElementById('username').innerHTML;
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }
  const imgRef = useRef();
  const toggleFullscreen = () => {
  if (!full) {
    imgRef.current?.requestFullscreen();
    setFull(true);
  } else {
    document.exitFullscreen();
    setFull(false);
  }
}

  return (
    <div className='navbar'>
      <span className="logo" style={{cursor: "pointer"}} onClick={()=>{setShowChat(false)}}>CODA</span>
      <div className="user">
        <img ref={imgRef} onClick={toggleFullscreen} style={{cursor: "pointer"}} src={currentUser.photoURL} alt="" />
        <span id='username' onClick={copy}>{currentUser.displayName}</span>
        <Menu />
      </div>
    </div>
  )
}

export default Navbar
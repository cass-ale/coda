import React, { useContext } from 'react';
import Menu from './Menu';
import { AuthContext } from '../context/AuthContext'
import {HideContext} from "../context/HideContext"

const Navbar = () => {
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

  return (
    <div className='navbar'>
      <span className="logo" style={{cursor: "pointer"}} onClick={()=>{setShowChat(false)}}>CODA</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span id='username' onClick={copy}>{currentUser.displayName}</span>
        <Menu />
      </div>
    </div>
  )
}

export default Navbar
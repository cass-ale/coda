import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import {HideContext} from "../context/HideContext"

const Navbar = () => {
  const {currentUser} = useContext(AuthContext);
  const { setShowChat } = useContext(HideContext);

  return (
    <div className='navbar'>
      <span className="logo" style={{cursor: "pointer"}} onClick={()=>{setShowChat(false)}}>CODA</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>Sign Out</button>
      </div>
    </div>
  )
}

export default Navbar
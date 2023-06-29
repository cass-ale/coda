import React, {useContext} from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';






const Nav = () => {
  const {currentUser} = useContext(AuthContext)


  return (
    <div className='navbar'>
      <span className="logo">CODA</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.userName}</span>
        <button onClick={() =>signOut(auth)}>Sign Out</button>
      </div>
    </div>
  )
}

export default Nav
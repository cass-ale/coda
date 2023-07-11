import React, { useContext, useRef, useState } from 'react'
import { AuthContext } from '../context/AuthContext'







const Profile = () => {
    const [full, setFull] = useState(false);
    const {currentUser} = useContext(AuthContext);
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
    <div className='profileBar'>
        <img ref={imgRef} onClick={toggleFullscreen} style={{cursor: "pointer"}} src={currentUser.photoURL} alt="" />
        <span id='username' onClick={copy}>{currentUser.displayName}</span>
    </div>
  )
}

export default Profile
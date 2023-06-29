import React from 'react'
import Sidebar from "../Components/Sidebar"
import Chat from "../Components/Chat"






const Home = () => {
  return (
    <div className='Home'>
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default Home
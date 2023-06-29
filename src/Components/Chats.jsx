import React from 'react'
import pfp from '../Images/cover.jpg'








const Chats = () => {
  return (
    <div className='chats'>
      <div className="userChat">
        <img src={pfp} alt="" />
        <div className="userChatInfo">
          <span>otherName</span>
          <p>Hello</p>
        </div>
      </div>

      <div className="userChat">
        <img src={pfp} alt="" />
        <div className="userChatInfo">
          <span>otherName</span>
          <p>Hello</p>
        </div>
      </div>

      <div className="userChat">
        <img src={pfp} alt="" />
        <div className="userChatInfo">
          <span>otherName</span>
          <p>Hello</p>
        </div>
      </div>

      <div className="userChat">
        <img src={pfp} alt="" />
        <div className="userChatInfo">
          <span>otherName</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  )
}

export default Chats
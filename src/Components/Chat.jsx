import React from 'react';
import Messages from './Messages';
import Input from './Input';
import more from '../Images/more-vertical.svg';
import add from '../Images/user-plus.svg';
import video from '../Images/video.svg';







const Chat = () => {
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>userName</span>
        <div className="chatIcons">
          <img src={video} alt="" />
          <img src={add} alt="" />
          <img src={more} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat
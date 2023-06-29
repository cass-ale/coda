import React from 'react'








const Message = () => {
  return (
    <div className='message owner'>
      <div className="messageInfo">
        <img src="https://picsum.photos/200" alt="" />
        <span>Just now</span>
      </div>
      <div className="messageContent">
        <p>Hello</p>
        <img src="https://picsum.photos/200" alt="" />
      </div>
    </div>
  )
}

export default Message
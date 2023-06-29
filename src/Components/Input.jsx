import React from 'react'
import plus from '../Images/plus-circle.svg'
import send from '../Images/send.svg'







const Input = () => {
  return (
    <div className='input'>
        <input type="file" style={{display: "none"}} id='file' />
        <label htmlFor="file">
          <img src={plus} alt="" />
        </label>
      <input type="text" placeholder='Message @User' />
      <div className="send">
        <button id='button' style={{display: "none"}}>Send</button>
        <label htmlFor="button">
          <img src={send} alt="" />
        </label>
      </div>
    </div>
  )
}

export default Input
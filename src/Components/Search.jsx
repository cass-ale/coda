import React from 'react'
import pfp from '../Images/cover.jpg'







const Search = () => {
  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Search conversations...' />
      </div>
      <div className="userChat">
        <img src={pfp} alt="" />
        <div className="userChatInfo">
          <span>otherName</span>
        </div>
      </div>
    </div>
  )
}

export default Search
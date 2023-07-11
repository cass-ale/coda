import React from 'react';
import Nav from "./Nav";
import Search from './Search';
import Chats from './Chats'
import Profile from './Profile';





const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Nav />
      <Search />
      <Chats />
      <Profile/>
    </div>
  )
}

export default Sidebar
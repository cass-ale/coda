import React from 'react';
import Nav from "./Nav";
import Search from './Search';
import Chats from './Chats'





const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Nav />
      <Search />
      <Chats />
    </div>
  )
}

export default Sidebar
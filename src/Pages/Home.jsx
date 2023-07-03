import React, {useContext} from 'react'
import Sidebar from "../Components/Sidebar"
import Chat from "../Components/Chat"
import Placeholder from "../Components/PlaceholderChat"
import { HideContext } from '../context/HideContext'






const Home = () => {

  const {showChat} = useContext(HideContext);

  return (
    <div className='Home'>
      <div className="container">
        <Sidebar />
        {!showChat ? (<Placeholder />) : (
        <Chat />)}
      </div>
    </div>
  )
}

export default Home
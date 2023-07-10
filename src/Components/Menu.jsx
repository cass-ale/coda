import React, {useState} from 'react';
import close from "../img/x.svg";
import more from "../img/more-vertical.svg";
import {signOut} from "firebase/auth";
import { auth } from '../firebase';







const Menu = () => {
    const [menu, setMenu] = useState(false);


  return (
    <div className='menu'>
    <img src={more} alt="" onClick={()=>setMenu(!menu)} />


    {menu && <div className='menuBox'>
    <section><img src={close} alt="" onClick={()=>setMenu(false)} /></section>
    <a href='mailto:cass.ale@outlook.com?subject=Coda Messaging Contact&cc=cass@caprimag.com&body=Hi, this is a prewritten message to guide you in writing an email regarding the Coda Messaging App. If you have any feedback, comments, or questions, feel free to write them below, and I will do my best to reply quickly. Thanks for trying Coda!' target="_blank" rel="noopener noreferrer"><button>Comments or Questions?</button></a>
    <button onClick={()=>signOut(auth)}>Sign Out</button>
    </div>}
    </div>
  )
}

export default Menu
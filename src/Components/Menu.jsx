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
    <button onClick={()=>signOut(auth)}>Sign Out</button>
    </div>}
    </div>
  )
}

export default Menu
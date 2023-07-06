import React, { useContext, useState, useRef } from "react";
import max from "../img/maximize.svg";
import min from "../img/minimize-2.svg";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { HideContext } from "../context/HideContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const {showSide, setShowSide, showChat, setShowChat} = useContext(HideContext);
  const [full, setFull] = useState(false);

  const width = 1020;

  const imgRef = useRef();
  const toggleFullscreen = () => {
  if (full == false) {
    imgRef.current?.requestFullscreen();
    setFull(true);
  } else {
    document.exitFullscreen();
    setFull(false);
  }
}
const copy = async () => {
  let text = document.getElementById('username').innerHTML;
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy', err)
  }
}
  const handleClick = () => {
    if (window.innerWidth < width){
    setShowSide(!showSide);
    setShowChat(!showChat);
    } else {
      setShowSide(!showSide)
    }
  }

  return (
    <div className="chat">
      <div className="chatInfo">
        <span onClick={copy}>{data.user?.displayName}</span>
        <img src={data.user?.photoURL} alt="" ref={imgRef} onClick={toggleFullscreen} style={{clipPath: "circle()", width: "3rem", height: "auto", objectFit: "cover", cursor: "pointer"}} />
        <div className="chatIcons">
          <img src={showSide ? max : min} alt="" onClick={handleClick}/>
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;
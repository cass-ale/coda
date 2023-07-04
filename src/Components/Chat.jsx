import React, { useContext } from "react";
import max from "../img/maximize.svg";
import min from "../img/minimize-2.svg";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { HideContext } from "../context/HideContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const {showSide, setShowSide} = useContext(HideContext);

  const handleClick = () => {
    setShowSide(!showSide);
  }

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
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
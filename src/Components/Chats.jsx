import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { HideContext } from "../context/HideContext";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";







const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const { setShowChat, setShowSide } = useContext(HideContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);
  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    setShowChat(true);
    setShowSide(false);
  };
  const truncate = (str) => {
    if (window.innerWidth < 1020) {
    return str.length > 50 ? str.substring(0, 25) + "..." : str;
    } else {
    return str.length > 100 ? str.substring(0, 50) + "..." : str;
    }
  }
  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p style={{overflow: "hidden", textOverflow: "ellipsis"}}>{(!chat[1].lastMessage?.text) ? chat[1].lastMessage?.text : truncate(chat[1].lastMessage?.text)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
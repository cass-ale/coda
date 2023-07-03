import React, { useContext, useState } from "react";
import plus from '../img/plus-circle.svg'
import send from '../img/send.svg'
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";






const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };

  const isDisabled = text === "" && img === null;

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else if (text) {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    } else {return null}

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div className='input'>
        <input type="file" style={{display: "none"}} id='file' onChange={(e)=>setImg(e.target.files[0])}/>
        <label htmlFor="file">
          <img src={plus} alt="" />
        </label>
      <input type="text" placeholder="Send a message" onKeyDown={handleKey} onChange={(e)=>setText(e.target.value)} value={text}/>
      <div className="send">
        <button disabled={isDisabled} id='button' style={{display: "none"}}>Send</button>
        <label htmlFor="button" onClick={handleSend}>
          <img src={send} alt="" />
        </label>
      </div>
    </div>
  );
};

export default Input;

import React, { useContext, useState, useEffect } from "react";
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
import imageCompression from 'browser-image-compression';






const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [plc, setPlc] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };

  const isDisabled = (text === "" || text.length > 250) || (img === null || img.length === 0);


  useEffect(() => {
    const plcholdGen = () => {
    const num = Math.floor(Math.random() * 10);
    let hold = "";

    if (num == 0) {
      hold = "If it's been a while, say hey to @";
    } else if (num < 3) {
      hold = "Send something cute to @";
    } else if (num < 5) {
      hold = "Something to say? Say it to @";
    } else if (num < 7) {
      hold = "Plan to hang out with @";
    } else if (num < 9) {
      hold = "Maybe it's time to see @";
    } else {
      hold = "Give a couple compliments to @";
    }

    setPlc(hold);
  }
    plcholdGen();
  }, [data.chatId]);
  const handleSend = async () => {
    if (img) {
      const options = {
        maxSizeMB: 0.01,
        maxWidthOrHeight: 1920
      }
      const newImg = await imageCompression(img, options)

      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, newImg);

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
        <input type="file" style={{display: "none"}} id='file' onChange={(e)=>setImg(e.target.files[0])} accept="image/png, image/jpg, image/jpeg"/>
        <label htmlFor="file">
          <img src={plus} alt="" />
        </label>
      <input maxLength={150} type="text" placeholder={plc + data.user?.displayName} onKeyDown={handleKey} onChange={(e)=>setText(e.target.value)} value={text}/>
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

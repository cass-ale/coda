import React, {useContext, useState} from 'react'
import plus from '../Images/plus-circle.svg'
import send from '../Images/send.svg'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'







const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  const plctxt = "Send something cute to ";

  const handleSend = async (e) =>{
    e.preventDefault();
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
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

    } else {

      await updateDoc(doc(db, "chats", data.chatID), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderID:currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatID + ".lastMessage"]:{
        text
      },
      [data.chatID+".date"]: serverTimestamp()
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatID + ".lastMessage"]:{
        text
      },
      [data.chatID+".date"]: serverTimestamp()
    });

    setText("");
    setImg(null);

  };


  return (
    <div className='input'>
      <form onSubmit={handleSend}>
        <input type="file" style={{display: "none"}} id='file' onChange={(e)=>setImg(e.target.files[0])}/>
        <label htmlFor="file">
          <img src={plus} alt="" />
        </label>
      <input type="text" required placeholder={plctxt + data.user?.userName} onChange={(e)=>setText(e.target.value)} value={text}/>
      <div className="send">
        <button id='button' style={{display: "none"}}>Send</button>
        <label htmlFor="button" onClick={handleSend}>
          <img src={send} alt="" />
        </label>
      </div>
      </form>
    </div>
  )
}

export default Input
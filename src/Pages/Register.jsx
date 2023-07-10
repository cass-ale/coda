import React, { useState } from "react";
import Add from "../img/file-plus.svg";
import check from "../img/check-circle.svg"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [files, setFiles] = useState(false);

  const handleSubmit = async (e) => {
    const identity = (str) => {
      const num = Math.floor(Math.random() + Math.random() * 10000);
      return `${str}#${num}`
    }
    setLoading(true);
    e.preventDefault();
    const user = identity(e.target[0].value);
    const displayName = user.toLowerCase();
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="entryPage">
      <div className="entryForm">
        <span className="logo">CODA</span>
        <span className="title">Sign Up!</span>
        <form onSubmit={handleSubmit} autoComplete="on">
          <input autoFocus required minLength={3} maxLength={15} pattern="[a-zA-Z._]{3,15}$" title="Username can only contain letters, periods, and underscores." type="text" placeholder="username *" />
          <input required type="email" pattern="^\S+@\S+\.\S{2,}$" title="Email addresses must fit the format: example@domain.**" placeholder="email *" />
          <input required minLength={8} maxLength={30} type="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{8,}$" title="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number. White spaces are not allowed." placeholder="password *" />
          <input required style={{ display: "none" }} onChange={()=>setFiles(true)} type="file" id="file" accept="image/png, image/jpg, image/jpeg" />
          <label htmlFor="file">
          {!files ?<><img src={Add} alt="" />
             <span>Upload your profile picture *</span></> : <><img src={check} alt="" /><span>Photo Added!</span></>}
          </label>
          <button disabled={loading}>Sign up</button>
          {loading && <span>Uploading and compressing image please wait.</span>}
          {err && <span>Something went wrong!</span>}
        </form>
        {!loading && <ul>
          <li>Usernames must be at least 3 characters and can only contain letters, periods, and underscores.</li>
          <li>Email addresses must fit the following format: example@domain.**</li>
          <li>Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number. White spaces are not allowed.</li>
          <li>A Profile Picture is required to sign up for CODA.</li>
        </ul>}
        <p>
          Signed up already? <Link to="/Login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
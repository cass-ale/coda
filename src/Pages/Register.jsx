import React from 'react'
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from '../firebase'
import { Link, useNavigate } from 'react-router-dom';
import img from "../Images/image.svg"






export const Register = () => {
const [err, setErr] = React.useState(false);
const [loading, setLoading] = React.useState(false);

const navigate = useNavigate()

const handleSubmit = async (e) => {
  setLoading(true);
  e.preventDefault();
  const userName = e.target[0].value;
  const email = e.target[1].value;
  const password = e.target[2].value;
  const file = e.target[3].files[0];


try{
    const res = await createUserWithEmailAndPassword(auth, email, password);

    const date = new Date().getTime();
    const storageRef = ref(storage, `${userName + date}`);




    await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try{

          await updateProfile(res.user, {
            userName,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            userName,
            email,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, "userChats", res.user.uid), {});
          navigate("/");
        } catch (err) {
          console.log(err);
          setErr(true);
          setLoading(false);
        }
        });
      }
    );
      } catch(err) {
        console.log(err);
        setErr(true);
        setLoading(false);
      }

    }



  return (
    <div className='entryPage'>
        <div className='entryForm'>
            <span className="logo">CODA</span>
            <span className="title">Register</span>
            <form onSubmit={handleSubmit}>
                <input required type="text" placeholder='username'/>
                <input required type="email" placeholder='email'/>
                <input required type="password" placeholder='password' />
                <input required style={{display: "none"}} type="file" id='file'/>
                <label htmlFor="file">
                    <img src={img} alt="Upload" />
                    <span>Upload a profile picture</span>
                </label>
                <button disabled={loading}>Sign up</button>
                {loading && <span>Uploading and compressing the image please wait...</span>}
                {err && <span>Something went wrong</span>}
            </form>
            <p>Already signed up? <Link to="/login">Login</Link></p>
        </div>
    </div>
  )
}

export default Register;

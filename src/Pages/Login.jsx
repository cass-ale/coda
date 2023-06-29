import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";





export const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className='entryPage'>
        <div className='entryForm'>
            <span className="logo">CODA</span>
            <span className="title">Log In</span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password' />
                <button>Log In</button>
                {err && <span>Something went wrong</span>}
            </form>
            <p>New around here? <Link to="/register">Sign Up</Link></p>
        </div>
    </div>
  )
}

export default Login;

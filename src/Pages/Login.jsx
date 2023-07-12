import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
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
    <div className="entryPage">
      <div className="entryForm">
        <span className="logo">CODA</span>
        <span className="title">Welcome Back!</span>
        <form onSubmit={handleSubmit} autoComplete="on">
          <input autoFocus required autoCorrect="off" autoComplete="email" type="email" pattern="^\S+@\S+\.\S{2,}$" title="Please enter your email address." placeholder="email" />
          <input required type="password" autoComplete="password" minLength={8} maxLength={30} title="Please enter your password." placeholder="password" />
          <button>Sign in</button>
          {err && <span>Something went wrong!</span>}
        </form>
        <p>New around here? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
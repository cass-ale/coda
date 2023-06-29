import React from 'react'
import { Link } from 'react-router-dom';



export const Login = () => {
  return (
    <div className='entryPage'>
        <div className='entryForm'>
            <span className="logo">CODA</span>
            <span className="title">Register</span>
            <form>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password' />
                <button>Log In</button>
            </form>
            <p>New around here? <Link to="/register">Sign Up</Link></p>
        </div>
    </div>
  )
}

export default Login;

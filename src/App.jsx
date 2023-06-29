import "./styles.scss"
import { useContext } from "react";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from "./context/AuthContext";






function App() {

  const {currentUser} = useContext(AuthContext)

  const ProtectedRoute = ({children}) => {
    if(!currentUser) {
      return <Navigate to="/login" />
    }
    return children
  };



  return (
    <>
    <Router>
    <Routes>
    <Route exact path="/" element={
    <ProtectedRoute>
      <Home/>
    </ProtectedRoute>} />
    <Route exact path="/register" element={<Register />} />
    <Route exact path="/login" element={<Login />} />
    </Routes>
    </Router>
    </>
  )
}

export default App

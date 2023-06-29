import "./styles.scss"
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';






function App() {


  return (
    <>
    <Router>
    <Routes>
    <Route exact path="/" element={<Home/>} />
    <Route exact path="/register" element={<Register />} />
    <Route exact path="/login" element={<Login />} />
    </Routes>
    </Router>
    </>
  )
}

export default App

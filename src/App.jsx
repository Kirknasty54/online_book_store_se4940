import { useState } from 'react'
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import BooksPage from "./pages/BooksPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [admin, setAdmin] = useState(false);


  return (
      <div className={"w-screen h-screen bg-gradient-to-r from-cyan-500 to-indigo-500"}>
          <Navbar loggedIn={loggedIn} isAdmin={admin}/>
          <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/books" element={<BooksPage/>} />
              <Route path="/register" element={<RegisterPage/>} />
          </Routes>
          <Footer/>
      </div>
  )
}

export default App

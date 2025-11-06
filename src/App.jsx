import { useState, useEffect } from 'react'
import {useQuery, useQueryClient, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import {Route, Routes, Navigate} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import BooksPage from "./pages/BooksPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [admin, setAdmin] = useState(false);
    const queryClient = new QueryClient();

    const checkLoggedIn = () => {
        if(localStorage.getItem("token")){
            setLoggedIn(true);
        }
    }

    const checkAdmin = ()=> {
        if(0===1) {
            console.log("admin user")
        }
    }

    // Check if user is already logged in on mount
    useEffect(() => {
        checkLoggedIn();
    }, []);

    //check if user is admin
    useEffect(() => {
        checkAdmin();
    })

  return (
      <div className={"w-screen h-screen bg-gradient-to-r from-cyan-500 to-indigo-500"}>
          <QueryClientProvider client={queryClient}>
              <Navbar loggedIn={loggedIn} isAdmin={admin}/>
              <Routes>
                  <Route path="/" element={<HomePage/>} />
                  <Route path="/login" element={<LoginPage loginAction={checkLoggedIn} logInState={loggedIn}/>} />
                  <Route path="/books" element={<BooksPage/>} />
                  <Route path="/register" element={<RegisterPage registerAction={checkLoggedIn} logInState={loggedIn}/>} />
              </Routes>
              <Footer/>
          </QueryClientProvider>
      </div>
  )
}

export default App

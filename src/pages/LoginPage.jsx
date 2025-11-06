import LoginForm from "../components/LoginForm.jsx";
import {Navigate, useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function LoginPage({loginAction, logInState}) {
    let navigate = useNavigate();
    useEffect(() => {
        if(logInState) {
            console.log("logged in");
            navigate("/books");
        }
    })

    return(
        <div>
            <LoginForm onAction={loginAction}/>
        </div>
    )
}
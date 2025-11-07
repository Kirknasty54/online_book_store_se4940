import LoginForm from "../components/LoginForm.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function LoginPage({logInState}) {
    let navigate = useNavigate();
    useEffect(() => {
        if(logInState) {
            console.log("logged in");
            navigate("/books");
        }
    })

    return(
        <div>
            <LoginForm />
        </div>
    )
}
import RegisterForm from "../components/RegisterForm.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
export default function RegisterPage({registerAction, logInState}) {
    let navigate = useNavigate();
    useEffect(() => {
        if (logInState) {
            console.log("logged in");
            navigate("/books");
        }
    })

    return(
        <div>
            <RegisterForm registerAction={registerAction}/>
        </div>
    )
}
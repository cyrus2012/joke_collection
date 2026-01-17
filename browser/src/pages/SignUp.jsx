import axios from "axios";
import { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import UserSetterContext from "../context/UserSetterContext";
import statusCode from "../statusCode.js";

function SignUp(){

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const setUser = useContext(UserSetterContext);

    async function registerUser(event){
        event.preventDefault();
        event.target.disabled = true;

        if(name == ""){
            event.target.disabled = false;
            setError("Please enter username!");
            return;
        }

        if(password == ""){
            event.target.disabled = false;
            setError("Please enter password!");
            return;
        }

        try{
            const result = await axios.post("http://localhost:6500/register", {username: name, password:password});

            setName("");
            setPassword("");
            setError(null);
            
            if(result.data.statusCode == statusCode.success){
                console.log("user registration success");
                navigate("/signup/success");
            }else{
                event.target.disabled = false;
                //console.log(result.data.message);
                setError(result.data.message);
            }
        }catch(err){
            event.target.disabled = false;
            console.log(err);
            setError("Server does not response.");
        }
              
    }

    function onNameChange(event){
        setName(event.target.value);
    }

    function onPasswordChange(event){
        setPassword(event.target.value);
    }


    return(
        <div className="border border-3 border-info mx-auto p-4 mt-5 signDiv">
            <form className="mx-auto signForm">
                <h1 className="text-center">Sign Up</h1>
                <label htmlFor='username'>Username</label><br/>
                <input type='text' id='username' autoFocus className="w-100 p-1" onChange={onNameChange}></input><br/>
                <label htmlFor='password' className="mt-3">Password</label><br/>
                <input type='password' id='password' className="w-100 p-1" onChange={onPasswordChange}></input><br/>
                <button type='submit' onClick={registerUser} className="mt-4 btn btn-primary">Submit</button>
                {error && <p className="mt-3 loginError">{error}</p>}
            </form>
        </div>
    );
}

export default SignUp;
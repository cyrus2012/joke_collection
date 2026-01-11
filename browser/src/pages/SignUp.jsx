import axios from "axios";
import { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import UserSetterContext from "../context/UserSetterContext";

function SignUp(){

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const setUser = useContext(UserSetterContext);

    async function registerUser(event){
        event.preventDefault();
        
        try{
            const result = await axios.post("http://localhost:6500/register", {username: name, password:password});

            setName("");
            setPassword("");
            setError(null);
            
            if(result.data.status.code == 200){
                console.log("user registration success");
                navigate("/signup/success");
            }else{
                console.log(result.data.status.message);
                setError(result.data.status.message);
            }
        }catch(err){
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
        <>
            <h1>Sign Up</h1>
            <form>
                <label htmlFor='username'>username</label><br/>
                <input type='text' id='username' onChange={onNameChange}></input><br/>
                <label htmlFor='password'>password</label><br/>
                <input type='password' id='password' onChange={onPasswordChange}></input><br/>
                <button type='submit' onClick={registerUser}>submit</button>
            </form>

            {error && <p>{error}</p>}
        </>
    );
}

export default SignUp;
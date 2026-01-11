import axios from "axios";
import { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import UserSetterContext from "../context/UserSetterContext";

function SignIn(){

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const setUser = useContext(UserSetterContext);

    async function askAuthentication(event){
        event.preventDefault();
        
        try{
            const result = await axios.post("http://localhost:6500/login", {username: name, password:password});

            setName("");
            setPassword("");
            setError(null);
            
            if(result.data.status.code == 200){
                console.log(result.data.data);
                sessionStorage.setItem("currentUser", JSON.stringify(result.data.data));
                setUser(result.data.data);
                navigate("/");
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
            <h1>Sign In</h1>
            <form>
                <label htmlFor='username'>username</label><br/>
                <input type='text' id='username' value={name} onChange={onNameChange}></input><br/>
                <label htmlFor='password'>password</label><br/>
                <input type='password' id='password' value={password} onChange={onPasswordChange}></input><br/>
                <button type='submit' onClick={askAuthentication}>submit</button>
            </form>
            
            {error && <p>{error}</p>}
        </>
    );
}

export default SignIn;
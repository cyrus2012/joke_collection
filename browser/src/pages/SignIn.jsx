//import axios from "axios";
import { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import UserSetterContext from "../context/UserSetterContext";
import axiosInstance from "../axiosInstance.js";

function SignIn(){

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const setUser = useContext(UserSetterContext);

    async function askAuthentication(event){
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
            // const result = await axiosInstance.post("/login", 
            //     {username: name, password:password}, 
            //     {   
            //         headers: {'Content-Type': 'application/json'}, 
            //         withCredentials:true
            //     }
            // );
            const result = await axiosInstance.post("/login", {username: name, password:password});


            setName("");
            setPassword("");
            setError(null);

            console.log(result);

            if(result.data.status.code == 200){
                
                sessionStorage.setItem("currentUser", JSON.stringify(result.data.data));
                setUser(result.data.data);
                navigate("/");
            }else{
                event.target.disabled = false;
                console.log(result.data);
                console.log(result.data.status.message);
                setError(result.data.status.message);
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
                <h1 className="text-center">Sign In</h1>
                <label htmlFor='username'>Username</label><br/>
                <input type='text' id='username' autoFocus className="w-100 p-1" value={name} onChange={onNameChange}></input><br/>
                <label htmlFor='password' className="mt-3">Password</label><br/>
                <input type='password' id='password' className="w-100 p-1" value={password} onChange={onPasswordChange}></input><br/>
                <button type='button' onClick={askAuthentication} className="mt-4 btn btn-primary">Submit</button>
                {error && <p className="mt-3 loginError">{error}</p>}
            </form>
                
                
            
        </div>
    );
}

export default SignIn;
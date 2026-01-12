import {Link, useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import UserSetterContext from '../context/UserSetterContext';
//import axios from 'axios';
import axiosInstance from "../axiosInstance.js"

function Navigation(){

    const currentUser = useContext(UserContext);
    const setCurrentUser = useContext(UserSetterContext);
    const navigate = useNavigate();

    async function signOut(event){
        event.preventDefault();

        try{
            //const result  = await axiosInstance.post("/logout", {withCredentials: true});
            const result  = await axiosInstance.post("/logout");
            console.log(result);
            setCurrentUser(null);
            sessionStorage.setItem("currentUser", null);
            navigate("/");

        }catch(err){
            console.log(err);
            window.alert("Server has error. Please try again");
        }
    }

    return (
        <nav>
            <Link to="/">Joke Collection</Link>
            <ul>
                {!currentUser && <li><Link to="/signup">Sign Up</Link></li>}
                {!currentUser && <li><Link to="/signin">Sign In</Link></li>}
                
                {currentUser && <li><Link to="/create">add joke</Link></li>}
                {currentUser && <li><Link to="/savedlist">Saved</Link></li>}
                {currentUser && <li><Link onClick={signOut}>Sign Out</Link></li>}

            </ul>
        </nav>
    );
}

export default Navigation;
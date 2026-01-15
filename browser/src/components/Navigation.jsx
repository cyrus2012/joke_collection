import { NavLink, Link, useNavigate} from 'react-router-dom';
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
            window.alert("Server has error.");
            navigate("/");
        }
    }

    /*
    return (
        <nav className="d-flex justify-content-between p-2">
            <NavLink to="/" className="nav-link align-self-center">Joke Collection</NavLink>
            <ul className="nav justify-content-end nav-pills">
                {!currentUser && <li className="nav-item"><NavLink to="/signup" className="nav-link" >Sign Up</NavLink></li>}
                {!currentUser && <li className="nav-item"><NavLink to="/signin" className="nav-link" >Sign In</NavLink></li>}
                
                {currentUser && <li className="nav-item"><NavLink to="/create" className="nav-link">Add joke</NavLink></li>}
                {currentUser && <li className="nav-item"><NavLink to="/myjokes" className="nav-link">My jokes</NavLink></li>}
                {currentUser && <li className="nav-item"><NavLink to="/savedlist" className="nav-link">Saved jokes</NavLink></li>}
                {currentUser && <li className="nav-item"><NavLink onClick={signOut} className="nav-link">Sign Out</NavLink></li>}
            </ul>
        </nav>
    );
    */
    return (
        <nav className="navbar navbar-expand-sm text-bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand">Joke Collection</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav ">
                        {!currentUser && <li className="nav-item"><NavLink to="/signup" className="nav-link" >Sign Up</NavLink></li>}
                        {!currentUser && <li className="nav-item"><NavLink to="/signin" className="nav-link" >Sign In</NavLink></li>}
                        
                        {currentUser && <li className="nav-item"><NavLink to="/create" className="nav-link">Add joke</NavLink></li>}
                        {currentUser && <li className="nav-item"><NavLink to="/myjokes" className="nav-link">My jokes</NavLink></li>}
                        {currentUser && <li className="nav-item"><NavLink to="/savedlist" className="nav-link">Saved jokes</NavLink></li>}
                        {currentUser && <li className="nav-item"><NavLink to="#" onClick={signOut} className="nav-link">Sign Out</NavLink></li>}
                    </ul>
                </div>
            </div>
        </nav>
    );

}

export default Navigation;
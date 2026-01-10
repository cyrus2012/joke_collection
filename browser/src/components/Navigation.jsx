import {Link, useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import UserSetterContext from '../context/UserSetterContext';


function Navigation(){

    const currentUser = useContext(UserContext);
    const setCurrentUser = useContext(UserSetterContext);

    function signOut(){
        setCurrentUser(null);
        sessionStorage.setItem("currentUser", null);
        useNavigate("/");
    }

    return (
        <nav>
            <Link to="/">Joke Collection</Link>
            <ul>
                {!currentUser && <li><Link to="/signup">Sign Up</Link></li>}
                {!currentUser && <li><Link to="/signin">Sign In</Link></li>}
                
                {currentUser && <li><Link to="/savedlist">Saved</Link></li>}
                {currentUser && <li><Link onClick={signOut}>Sign Out</Link></li>}

            </ul>
        </nav>
    );
}

export default Navigation;
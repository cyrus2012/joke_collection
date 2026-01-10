import {Link} from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

function Navigation(){

    const currentUser = useContext(UserContext);

    return (
        <nav>
            <Link to="/">Joke Collection</Link>
            <ul>
                {!currentUser && <li><Link to="/signup">Sign Up</Link></li>}
                {!currentUser && <li><Link to="/signin">Sign In</Link></li>}
                
                {currentUser && <li><Link to="/signin">Profile</Link></li>}
                {currentUser && <li><Link to="/signin">Sign Out</Link></li>}

            </ul>
        </nav>
    );
}

export default Navigation;
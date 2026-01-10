import { useState } from 'react';
import UserContext from '../context/UserContext';
import UserSetterContext from '../context/UserSetterContext';


function UserProvider({children}){
    const [currentUser, setCurrentUser] = useState(null);

    return(
        <UserContext value={currentUser}>
            <UserSetterContext value={setCurrentUser}>
                {children}
            </UserSetterContext>
        </UserContext>
    );

}

export default UserProvider;


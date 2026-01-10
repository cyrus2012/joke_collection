import { useState } from 'react';
import UserContext from '../context/UserContext';
import UserSetterContext from '../context/UserSetterContext';


function UserProvider({children}){
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    const [currentUser, setCurrentUser] = useState(user);


    return(
        <UserContext value={currentUser}>
            <UserSetterContext value={setCurrentUser}>
                {children}
            </UserSetterContext>
        </UserContext>
    );

}

export default UserProvider;


import { useContext } from "react";
import { Navigate, Outlet } from 'react-router-dom';
import UserContext from "../context/UserContext.jsx";

function ProtectedPageRouter(){

  const user = useContext(UserContext);


  return user? <Outlet /> : (<Navigate to="/signin" replace={true} />);

}

export default ProtectedPageRouter;
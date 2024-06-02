import { useSelector } from "react-redux";
import {Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {

let  {userInfo} = useSelector((state) => state.userAuth);
  return userInfo ? <Outlet/> : <Navigate to="/" replace />
}

export default PrivateRoute
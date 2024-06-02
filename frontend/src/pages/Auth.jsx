/* eslint-disable react/prop-types */
import { useContext } from 'react';
import Login from '../components/Auth/LoginCard'
import { AuthContext } from '../context/authContext';
import Signup from '../components/Auth/SignupCard'

const Auth = ({ isVisible, onClose }) => {


  const {signupModal}=useContext(AuthContext)

  
  return (
    <>
    {isVisible && (
      <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-70 flex justify-center items-center">
       {signupModal?<Signup onClose={onClose}/>:<Login  onClose={onClose} />}
      </div>
    )}
  </>
  );
}


export default Auth;
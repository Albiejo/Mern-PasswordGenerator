/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AuthContext = createContext(); 

const AuthProvider = ({ children }) => { 
    
  const [signupModal, setSignupModal] = useState(false);

  const handleSignupOpen = () => {
    setSignupModal(prevState => !prevState); 
  };

  return (
    <AuthContext.Provider value={{ signupModal, handleSignupOpen }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
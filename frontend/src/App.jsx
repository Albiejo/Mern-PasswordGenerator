import Home from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import PrivateRoute from "./components/PrivateRoute"
import { NavbarDefault } from "./components/Navbar"
import './index.css'
import SavedPassword from "./pages/SavedPasswords"

const App=()=>{


  return (

    <Router>
      <Toaster position="top-right" />
    
        <NavbarDefault />
        
        <Routes>
       
          <Route path="/" element={<Home />} />
          <Route path="" element={<PrivateRoute />}>
            <Route path="/passwords" element={<SavedPassword />} />
          </Route>
  
        </Routes>
      

    </Router>
   
  )

}


export default App
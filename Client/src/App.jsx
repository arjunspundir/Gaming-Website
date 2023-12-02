import Home from './Component/Home';
import Navbar from './Component/Navbar';
import Notfound from './Component/Notfound';
import Signup from './Component/Signup';
import Login from './Component/Login';
import Contact from './Component/Contact';
import About from './Component/About';
import Profile from './Component/Profile';

import Logout from './Component/Logout';
import { Route, Routes } from 'react-router-dom';
import { createContext, useState } from 'react';

export const contextApi=createContext();
function App() {
  const [globalLogin , setGlobalLogin]=useState(false);
  const [globalName , setGlobalName]=useState(null);
  const [globalNumber , setGlobalNumber]=useState(null);
  const [globalEmail , setGlobalEmail]=useState(null);
 
  return (
    <>
    
      <contextApi.Provider value={{globalLogin , setGlobalLogin , globalName ,setGlobalName , globalNumber , setGlobalNumber ,globalEmail , setGlobalEmail}}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/logout" element={<Logout/>} />
        
        
        <Route path="*" element={<Notfound/>} />
      </Routes>
      </contextApi.Provider>

    </>
  );
}
export default App;
import React, { useContext, useEffect } from 'react'
import { contextApi } from '../App'
import { useNavigate } from 'react-router-dom';

function Logout() {
    const {globalLogin , setGlobalLogin}=useContext(contextApi);
    const navigate=useNavigate();
    useEffect(()=>{
        localStorage.removeItem('jwtToken');
       setGlobalLogin(false);
        navigate('/signup') ;
        return ;
    },[])
  return  null ;
  
}

export default Logout

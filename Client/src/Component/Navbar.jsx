import React from 'react'
import { useEffect  , useContext , useRef} from 'react';
import '../ComponentStyle/Navbar.css'
import {NavLink} from 'react-router-dom';
import logo from '../Images/logo.jpg'
import crossimg from '../Images/cross.png'
import menubar from '../Images/menubar.jpg'
import { contextApi } from '../App';
function Navbar() {
 
 const navlist = useRef(null);
 const cross = useRef(null);
 const menu = useRef(null);
 const toggle = (str)=>{
    if(str==='showcross'){
      cross.current.style.display='flex';
      menu.current.style.display='none';
      navlist.current.classList.remove('hide');
    }
    else if(str==='showmenu'){
      cross.current.style.display='none';
      menu.current.style.display='flex';
      navlist.current.classList.add('hide');
    }
 }
 const addClass=()=>{
  navlist.current.classList.add('hide');
  cross.current.style.display='none';
  menu.current.style.display='flex';
}
// navlist.current.addEventListener('click' , addClass);

  const {globalLogin , setGlobalLogin , globalName , setGlobalName , globalEmail , setGlobalEmail  , globalNumber , setGlobalNumber}=useContext(contextApi);
  const getDetail=async()=>{
    try {
      const token = localStorage.getItem('jwtToken');
      if(!token){
        //no token present
        return setGlobalLogin(false);
      }
      const res =await fetch('http://localhost:3000/verify',{
        method:"GET",
        headers:{
          "content-type":"application/json",
          "Authorization":token
        }
      });
      if(res.ok && res.status==200){
        const data=await res.json();
        //got the data
        setGlobalLogin(true);
        setGlobalName(data.user.username);
        setGlobalEmail(data.user.useremail);
        setGlobalNumber(data.user.usernumber);
        return ;
      }else{
        //not login
        setGlobalLogin(false);
        return ;
      }      
    } catch (error) {
      //not login
      setGlobalLogin(false);
      return ;
    }
  }
  useEffect(()=>{
  getDetail();
  },[]);
  useEffect(addClass , [addClass]);
  return (
    <div className="navbarContainer">
      <div className='navbar'>
        <div className="logo">
            <NavLink to='/' className="logo"><img src={logo} alt="Arjun" />Arjun</NavLink>
        </div>
        <div className="navlist hide" ref={navlist}>
            <div className="navContent"><NavLink to='/' onClick={addClass} className='link' style={({isActive})=>{
              return{
                color:isActive?'brown':'black'
              };
            }}>Home</NavLink></div>
            <div className="navContent"><NavLink to='/about'onClick={addClass}  className='link' style={({isActive})=>{
              return{
                color:isActive?'brown':'black'
              };
            }}>About us</NavLink></div>
            {globalLogin==true?(<div className="navContent"><NavLink to='/profile'onClick={addClass}  className='link' style={({isActive})=>{
              return{
                color:isActive?'brown':'black'
              };
            }}>Profile</NavLink></div>):''}
            <div className="navContent"><NavLink to='/contact' onClick={addClass} className='link' style={({isActive})=>{
              return{
                color:isActive?'brown':'black'
              };
            }}>Contact us</NavLink></div>
            
            <div className="navContent">{globalLogin==null || !globalLogin?(<NavLink to='/signup' onClick={addClass} className='link' style={({isActive})=>{
              return{
                color:isActive?'brown':'black'
              };
            }}>Sign up /Login</NavLink>):(<NavLink to='/logout' onClick={addClass} className='link' style={({isActive})=>{
              return{
                color:isActive?'brown':'black'
              };
            }}>Logout</NavLink>)}</div>
        </div>
        <div className="icon3">
              <img src={menubar} ref={menu} onClick={()=>toggle('showcross')} className="icon2 "  alt="menubar" />
              <img src={crossimg} ref={cross} onClick={()=>toggle('showmenu')} className="icon2 hide"  alt="cut" />
            </div>
      
    </div>
    </div>
  )
}

export default Navbar;

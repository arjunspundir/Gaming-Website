import React ,{useContext, useState} from 'react'
import {contextApi} from '../App'
import signupb from '../Images/signupb2.jpg'
import meassage from '../Images/meassage2.jpg'
import password from '../Images/cpassword2.png'
import '../ComponentStyle/Login.css'
import { Link, useNavigate } from 'react-router-dom'
function Login() {
    const {globalLogin , setGlobalLogin , globalName , setGlobalName , globalEmail , setGlobalEmail  , globalNumber , setGlobalNumber}=useContext(contextApi);
    const navigate=useNavigate();
    const [user,setUser]=useState({
        email:'',
        password:''
      })
      const change=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        setUser({...user,[name]:value});
       }
       const login=async ()=>{
        const {email , password}=user;
        if(!password || !email || password.length<=4){
            return alert('Invalid Credentials');
        }
        try{
            const res=await fetch('http://localhost:3000/signin',{
            method:'POST',
            headers:{
                "content-type":"application/json"
            },
            // credentials: 'include', 
            body:JSON.stringify({
                email , password 
            })
        });
        if(res.ok){
            const data=await res.json();
            if(res.status===200){
                localStorage.setItem("jwtToken",data.token);
                setGlobalLogin(true);
                alert(data.message);
                setGlobalName(data.userData.username);
                setGlobalNumber(data.userData.usernumber);
                setGlobalEmail(data.userData.useremail);
                console.log(globalEmail , globalName , globalNumber);
                setTimeout(()=>{
                    navigate('/logout');
                } , 60*60*1000)
                return navigate('/');
            }
                console.log(res.status);
                return alert(data.message);
        }
        }catch(e){
            // alert('Oops! server error');
        }
       }
  return (
    <div className='signContainer'>
        <div className="image" id='image'>
            <img src={signupb} alt="signup here" />
            <Link to='/signup' className="create"><div className="create">
                Create an account
            </div></Link>
        </div>
         <div className="form">
            <div className="title">Sign in</div>
            <div className='formContent'>
                <span className='icon'><img src={meassage} alt="icon" /></span>
                <input type="email" value={user.email} name='email' placeholder={'Enter your email'} onChange={change} /></div>

            <div className='formContent'>
                <span className='icon'><img src={password} alt="icon" /></span>
                <input type="password" value={user.password} name='password' onChange={change} placeholder={'Enter your password'}/></div>

            <button id='login' onClick={login}>Log in</button>
        </div> 
      
    </div>
  )
}

export default Login

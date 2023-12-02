import React ,{useState} from 'react'
 import validator from 'validator'
import {Link,useNavigate} from 'react-router-dom'
import '../ComponentStyle/Signup.css'
import people from '../Images/people2.webp'
import meassage from '../Images/meassage2.jpg'
import number from '../Images/number.jpg'
import profession from '../Images/profession3.jpg'
import cpassword from '../Images/password3.jpg'
import password from '../Images/cpassword2.png'
import signupb from '../Images/signupb2.jpg'
function Signup() {
 const navigate=useNavigate();
  const [user,setUser]=useState({
    name:'',
    email:'',
    number:'',
    work:'',
    password:'',
    cpassword:''
  })
  const change=(e)=>{
   let name=e.target.name;
   let value=e.target.value;
   setUser({...user,[name]:value});
  }
  const register=async ()=>{
    const {name , email , number , work , password , cpassword} = user;
    if(!name || !email || !number || !password || !cpassword){
        return alert('please fill mandatory fields');
        
      }
      if(number.length !=10)
      return alert('Contact number not valid');

    if(password.length<=4){
      return alert('password lenght should be atleast 5 characters long');
    }
    if(password!==cpassword){
        return alert('passwords not match');
    }
    if(!validator.isEmail(email)){
        return alert('please fill correct email');
    }
    try{ 
        const res = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name, email, number, password, work
            })
          });
          
    if (res.ok) {
        const data = await res.json(); // Extract JSON data from the response
        if(res.status==200 ){
          alert(data.message);
           return navigate('/login');
        } // Log the response data sent from the server
        return alert(data.message)
      } 
      else {
        alert('server error');
      }
    } catch (e) {
      console.log('not successful');
    }
  };

    return (
    <div className='signContainer'>
        <div className="form">
            <div className="title">Sign up</div>
            <div className='formContent'>
                <span className='icon'><img src={people} alt="icon" /></span>
                <input type="text" value={user.name} name='name' placeholder={'Your name'} onChange={change}/></div>
            <div className='formContent'>
                <span className='icon'><img src={meassage} alt="icon" /></span>
                <input type="email" value={user.email} name='email' placeholder={'Your email'} onChange={change} /></div>
            <div className='formContent'>
                <span className='icon'><img src={number} alt="icon" /></span>
                <input type="number" value={user.number} name='number' placeholder={'Your number'} onChange={change} /></div>
            <div className='formContent'>
                <span className='icon'><img src={profession} alt="icon" /></span>
                <input type="text" value={user.work} name='work' placeholder={'Your profession'} onChange={change}/></div>
            <div className='formContent'>
                <span className='icon'><img src={password} alt="icon" /></span>
                <input type="password" value={user.password} name='password' onChange={change} placeholder={'Your password'}/></div>
            <div className='formContent'>
                <span className='icon'><img src={cpassword} alt="icon" /></span>
                <input type="password" value={user.cpassword}  name='cpassword' placeholder={'Confirm password'} onChange={change}/></div>
            <button onClick={register} className='register'> Register</button>
        </div>
        <div className="image">
            <img src={signupb} alt="signup here" />
            <Link to='/login' className='create'>Already Registred</Link>
        </div>
      
    </div>
  )
}

export default Signup

import React ,{useState , useEffect}from 'react'
import '../ComponentStyle/Contact.css'
import message2 from '../Images/meassage2.jpg'
import phone from '../Images/phone.jpg'
import address from '../Images/address.jpg'
// import people from '../Images/people2.webp'
import { useNavigate } from 'react-router-dom'
function Contact() {
    const navigate=useNavigate();
    const [message,setMessage]=useState('');
    const [name,setName]=useState(null);
    const [email,setEmail]=useState(null);
    const [number,setNumber]=useState(null);
    useEffect(()=>{
        const getDetail=async ()=>{
            const storedToken=localStorage.getItem('jwtToken');
            if(!storedToken)
              return alert('Please login before sending messages');
           try {
                 
            const res= await fetch('http://localhost:3000/verify',{
                method:"GET",
                headers:{
                    'content-type':'application/json',
                    'Authorization':`${storedToken}`
                }
            });
            if(res.ok){
                const data = await res.json();
                if(res.status===200){
                    setEmail(data.user.useremail);
                    setName(data.user.username);
                    setNumber(data.user.usernumber);
                    // return <h1>hello</h1>;

                }
                else{
                    return alert('please login before sending messages');
                }
            }
            else{
                return alert('please login before sending messages');
            }
           } catch (error) {
             console.log("error",error);
           }
        }
        getDetail();
    },[])
    const sendMessage=async()=>{
        if(message=='')
        return alert('Please write some meassage atleast ');
        
        if(name==null){
        alert('Please login before sending messages');
        navigate('/login');
        return ;
    }
       try {
        const res = await fetch('http://localhost:3000/message' , {
            method:"POST" , 
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                email , message
            })
        });
        if(res.ok && res.status==200){
            const data = await res.json();
            console.log(data);
            setMessage('');
            return alert(data.message);
        }
        else{
            return alert(res);
        }
       } catch (error) {
        console.log(error);
        
       }

    }
  return (
    <div className='contact'>
        <div className="contactInfo">
            <div className="element">
                <img src={phone} alt="Element" className='icon elementIcon'/>
                <div className="elementInfo">
                    <div className="elementName">Phone</div>
                    <div className="elementValue">+91 9024678909</div>
                </div>
            </div>
            <div className="element">
                <img src={message2} alt="Element" className='icon elementIcon'/>
                <div className="elementInfo">
                    <div className="elementName">Email</div>
                    <div className="elementValue">abc154@gmail.com</div>
                </div>
            </div>
            <div className="element">
                <img src={address} alt="Element" className='icon elementIcon' />
                <div className="elementInfo">
                    <div className="elementName">Address</div>
                    <div className="elementValue">Meerut , Uttar Pradesh , India </div>
                </div>
            </div>

        </div>
        <div className="contactMessage">
            <div className="title">Get in Touch</div>
            <div className="clientContact">
            <div className="clientElement">
                <input type="text"  placeholder='Your name' value={name?name:''}  readOnly/>
            </div>
            <div className="clientElement">
                <input  type="email"  placeholder='Your email' value={email?email:''} readOnly />
            </div>
            <div className="clientElement">
                <input type="number" placeholder='Your number' value={number?number:''} readOnly />
            </div>
            </div>
            <div className="clientMeassage">
                <textarea name="message" id="message" placeholder='Write Message here' value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
            </div>
        <button id='messageButton' onClick={sendMessage}>Send message</button>
        </div>
      
    </div>
  )
}

export default Contact

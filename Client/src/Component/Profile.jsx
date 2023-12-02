import React ,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import '../ComponentStyle/About.css'
import pic from '../Images/profile.jpg'
function About() {
    const navigate=useNavigate();
    const [loading , setLoading]=useState(true);
  const [name , setName]=useState('Loading data');
  const [email , setEmail]=useState('Loading data');
  const [number , setNumber]=useState('Loading data');
  const [work , setWork]=useState('Developer');
//   const [name , setName]=useState('');
    useEffect(()=>{
        const verify=async ()=>{
            const storedToken = localStorage.getItem('jwtToken'); // Retrieve the token from localStorage

            if (!storedToken) {
                // console.log('Token not found');
                navigate('/about');
                return;
            }
            // console.log(storedToken);
            try{
                const res=await fetch('http://localhost:3000/verify' , {
                    method:'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Add your token in the Authorization header (replace 'YOUR_TOKEN' with the actual token)
                        'Authorization': `${storedToken}`
                    }
                } );
                if(res.ok && res.status==200){
                    const data=await res.json();
                    setName(data.user.username);
                    setEmail(data.user.useremail);
                    setNumber(data.user.usernumber);
                    setWork(data.user.userwork);
                    setLoading(false);
                    // console.log(data);


                }
                else{
                    navigate('/about')
                    // console.log(res);
                }
            }catch(e){
                // console.log("last part"+ e);
                navigate('/about');
            }
        }
        verify();
       
    } , []);
    if(loading)
    return <h1 style={{width:'100%',height:'100vh',display:'flex' , justifyContent:'center',alignItems:'center'}}>Loading..</h1>
  return (
    <div className='about'>
        <div className="header">
            <div className="title">Profile</div>
            <div className="description">{work}</div>
        </div>
        <div className="footer">
            <div className="content">
                <div className="heading">Ourselves</div>
                <div className="contentDescription">
                I am a MERN (MongoDB, Express.js, React, Node.js) developer! My toolkit encompasses a powerful stack of technologies that enable me to craft dynamic and robust web applications. MongoDB provides a flexible and scalable database solution, while Express.js streamlines server-side development. React allows me to build captivating user interfaces, and Node.js enables efficient and scalable backend operations. Together, these technologies form a versatile ecosystem, empowering me to create seamless and responsive web applications that cater to diverse needs. Whether it's handling complex data, creating interactive user experiences, or ensuring smooth server-client communication, the MERN stack equips me to tackle challenges and deliver innovative solutions.






                </div>
            </div>
            <div className="image">
                <img src={pic} alt="My image" />
            </div>
            <div className="detail">
                <div className="heading">Details</div>
                <div className="detailContent">
                    <div className="key">Name</div>
                    <div className="value">{name}</div>
                    <div className="key">Age</div>
                    <div className="value">20</div>
                    <div className="key">Profile Status </div>
                    <div className="value">{work}</div>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default About

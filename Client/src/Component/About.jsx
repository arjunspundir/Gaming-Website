import React  from 'react'
import '../ComponentStyle/About.css'
import pic from '../Images/profile.jpg'
function About() {
 
  return (
    <div className='about'>
        <div className="header">
            <div className="title">About Us</div>
            <div className="description">We are MERN developers</div>
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
                    <div className="value">{'Arjun Singh Pundir'}</div>
                    <div className="key">Age</div>
                    <div className="value">20</div>
                    <div className="key">Profile Status </div>
                    <div className="value">{'Mern Stack developer'}</div>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default About

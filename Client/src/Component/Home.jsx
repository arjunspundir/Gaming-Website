import React, { useState, useContext, useEffect } from 'react';
import { contextApi } from '../App';
import '../ComponentStyle/Home.css';

export default function Home() {
  // const [name, setName] = useState('wel');
  // const [login, setLogin] = useState(false);
  const { globalLogin, setGlobalLogin,globalName, setGlobalName } = useContext(contextApi);

  // const getDetail = async () => {
  //   try {
  //     const token = localStorage.getItem('jwtToken');
  //     if (!token) {
  //       setLogin(false);
  //       return setGlobalLogin(false);
  //     }

  //     const res = await fetch('http://localhost:3000/verify', {
  //       method: 'GET',
  //       headers: {
  //         'content-type': 'application/json',
  //         Authorization: token,
  //       },
  //     });

  //     if (res.ok && res.status === 200) {
  //       const data = await res.json();
  //       setLogin(true);
  //       setName(data.user.username);
  //       setGlobalName(data.user.username);
  //       setGlobalLogin(true);
  //     } else {
  //       setLogin(false);
  //       setGlobalLogin(false);
  //     }
  //   } catch (error) {
  //     setLogin(false);
  //     setGlobalLogin(false);
  //   }
  // };

  // useEffect(() => {
  //   getDetail();
  // }, []);

  return (
    <div className='home'>
      <div className='section1'>
        {globalLogin ? <span className='first'>Welcome Back! <span></span></span> : <span className='first'>Wel</span>}
        <span className='second'>We Are The ME</span>
      </div>
      <div className='section2'>
        {globalLogin ? <span className='first'>{globalName}</span> : <span className='first'>come</span>}
        <span className='second'>RN Developers</span>
      </div>
    </div>
  );
}

const express = require('express');
const verify=require('../jwt/jwtverification')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('../DB/conn');
const User = require('../models/userSchema');

const router = express.Router();

router.post('/register', async (req, res) => {
  // Your registration logic remains the same...
  let {name , email , number ,  password,work } =req.body;
  if(!name || !email ||!number || !password){
    return res.json({message:'please fill mandatory fields'});
  }

  try {
    // Registration logic...
    const data = await User.findOne({$or:[{email:email} , {number:number}]});
    if(data){
      return res.json({message:'User already exists'});
    }
    password = bcrypt.hashSync(password , 10);
    const user = new User({name , email , number , password , work});
    await user.save();

    return res.status(200).json({ message: 'User registered successfully' });
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: e.message });
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Invalid credentials' });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(200).json({ message: 'Invalid credentials' });

    if (bcrypt.compareSync(password, user.password)) {
      const secretKey = process.env.SECRETKEY;
      const payload = {
        userId: user._id,
        username: user.name,
        useremail:user.email,
        usernumber:user.number,
        userwork:user.work,
      };
      const options = {
        expiresIn: '1h' // Token expires in 1 hour
      };
      const token = jwt.sign(payload, secretKey, options);
      
      // Set the token as a cookie in the response
      user.token=token;
      await user.save();    
      const userData = {
        username: user.name,
        usernumber: user.number,
        useremail: user.email,
      };
      return res.status(200).json({ message: "User Login Successfully" , token,userData });
    } else {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.get('/verify', verify, (req, res) => {
  // console.log('token recieved')
  res.status(200).json({ message: 'Access granted', user: req.user });
});
router.post('/message' , async (req,res)=>{
  const {email , message}=req.body;
  if(!email || !message)
  return res.json({message:'Invalid Message'});

 try {
  const user = await User.findOne({email:email});
  if(!user){
   return res.json({message:'Invalid credentials'});
  }
  user.message=message ;
  await user.save();
  return res.status(200).json({message:'Message sent sucessfully'});
 } catch (error) {
   console.log(error);
 }

})

module.exports = router;
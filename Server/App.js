const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
require('./DB/conn');
// const User=require('./models/userSchema');
const app=express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    credentials: true,
  }));
  

const PORT=process.env.PORT;
app.use('/',require('./routes/auth'));

app.listen(PORT , ()=>console.log('Listening at port '+PORT))
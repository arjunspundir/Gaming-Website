const mongoose= require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    number:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    work:{
        type:String,   
    },
    token:{
        type:String
    },
    message:{
        type:String
    }
})
const User=mongoose.model('USER',userSchema);
module.exports=User;
const mongoose=require('mongoose');
const url = process.env.DATABASE;

mongoose.connect(url).then((res)=>console.log(mongoose.connection.name)).catch((e)=>console.log('Not connected'+e));
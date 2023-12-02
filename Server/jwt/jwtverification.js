const jwt=require('jsonwebtoken');

const verify=(req,res,next)=>{
    const recievedToken=req.headers.authorization;
    if(!recievedToken){
        // console.log('no token recieved ');
    return res.status(403).json({message:'Token is missing'});
}

    const skey=process.env.SECRETKEY;
    jwt.verify(recievedToken , skey , (e,decoded)=>{
        if (e) {
            return res.status(401).json({ message: 'Token is invalid' });
          }
        //   console.log('token recieved ');
          req.user=decoded ;
          next();
    });
};
module.exports=verify;
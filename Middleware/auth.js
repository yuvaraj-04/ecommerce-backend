const jwt =require("jsonwebtoken")

const auth=(req,res,next)=>{
    if(!req.header("Authorization")){
        return res.status(401).send("Unauthorized")
    }
    const token=req.header("Authorization").split(" ")[1];
    if(!token){
        return res.status(401).json({message:"Access denied. No token provided."})
    }
    try{
        const decoded=jwt.verify(token,"secert_token");
        req.user=decoded;
        next();
    }
    catch(e){
        res.status(400).json({message:"Invalid token."})
    }
}
module.exports=auth;
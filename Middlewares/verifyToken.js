const jwt=require("jsonwebtoken");
const prisma=require("../Config/prisma");
const { errorResponse } = require("../Config/errorHandling");
const { SECRET_KEY } = require("../Config/config");
const verifyToken=async(req,res,next)=>{
    let token;
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token=req.headers.authorization.split(' ')[1];
        }
        const decode=jwt.verify(token,SECRET_KEY);
        const user=await prisma.user.findUnique({
            where:{
                id:decode.id,
                role:decode.role
            }
        });

        req.user=user;
        next();
    } catch (error) {
        console.log("Error",error);
        return errorResponse(res,500,"Something Went Wrong")
    }

}
module.exports=verifyToken;
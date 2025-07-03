const { errorResponse } = require("../Config/errorHandling")
const isAdmin=(req,res,next)=>{

    const role=req.user.role;
   if(role !== "FREELANCER"){
    return errorResponse(res,400,"Only freelancers allow")
   }
   next();
}
module.exports=isAdmin;
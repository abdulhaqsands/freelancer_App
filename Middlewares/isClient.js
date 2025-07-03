const { errorResponse } = require("../Config/errorHandling")
const isClient=(req,res,next)=>{

    const role=req.user.role;
   if(role !== "CLIENT"){
    return errorResponse(res,400,"Only Client allow")
   }
   next();
}
module.exports=isClient;
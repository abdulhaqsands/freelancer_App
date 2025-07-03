const prisma=require("../../Config/prisma");
const { errorResponse, successResponse }=require("../../Config/errorHandling");

const getAllGigs=async(req,res)=>{
    try {
        const userId=req.user.id;
        const getGigs=await prisma.gig.findMany();
        if(!getGigs) return errorResponse(res,200,"No Gigs Available:");
        return successResponse(res,200,{"AllGigs":getGigs})
    } catch (error) {
        console.log("Error",error);
        return errorResponse(res,500,"Something Went Wrong: ")
    }

}
module.exports={getAllGigs}
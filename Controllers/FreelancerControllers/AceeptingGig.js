const prisma=require("../../Config/prisma");
const {errorResponse,successResponse}=require("../../Config/errorHandling");

const updateOrderStatus=async(req,res)=>{
    try {
        const freelancerId=req.user.id;
        const {orderId}=req.params;
        const {status}=req.body;
        const ValidStatus=["ACCEPTED", "REJECTED", "COMPLETED", "CANCELLED"];
        if(!ValidStatus.includes(status)){
            return errorResponse(res,400,"Invalid status ")
        };
        const existOrder=await prisma.order.findUnique({
            where:{id:parseInt(orderId)}
        });
        if(!existOrder) return errorResponse(res,401,"You can't Update Status");

         if (existOrder.freelancerId !== freelancerId) {
      return errorResponse(res, 403, "You are not authorized to update this order");
    }
        const updateOrder=await prisma.order.update({
            where:{id:parseInt(orderId)},
            data:{status}
        })

            return successResponse(res, 200, `Order ${status.toLowerCase()} successfully`, updateOrder);

    } catch (error) {
        console.log("Error",error);
        return errorResponse(res,500,"Something went wrong")
    }

}
module.exports={updateOrderStatus}
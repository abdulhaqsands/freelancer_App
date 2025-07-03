const prisma = require("../../Config/prisma");
const { errorResponse, successResponse } = require("../../Config/errorHandling");

const allMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await prisma.order.findMany({
      where: { clientId: userId },
     select: {
        gig:{
            select:{
                title:true,
                description:true,
                category:true,
            }
        }
       //gig: true,             
       // freelancer: true,     
       // review: true           
      }
    });

    if (orders.length === 0) {
      return errorResponse(res, 404, "No orders found.");
    }

    return successResponse(res, 200, "All Orders", orders);
  } catch (error) {
    console.log("Error", error);
    return errorResponse(res, 500, "Something went wrong.");
  }
};

module.exports = { allMyOrders };

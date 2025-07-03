const prisma = require("../../Config/prisma");
const {
  errorResponse,
  successResponse,
} = require("../../Config/errorHandling");

const order = async (req, res) => {
  try {
    const clientId = req.user.id;
    const { gigId, message } = req.body;
    const [existGig, existUser] = await Promise.all([
      prisma.gig.findUnique({ where: { id: gigId } }),
      prisma.user.findUnique({ where: { id: clientId } }),
    ]);
    if (!existUser) errorResponse(res, 401, "Unauthorized User");
    if (!existGig) errorResponse(res, 401, "Gig not found");

    const freelancerId = existGig.userId;
    const createOrder = await prisma.order.create({
      data: {
        gigId,
        freelancerId,
        clientId,
        message,
      },
    });

    return successResponse(
      res,
      201,
      "Your request send to Freelancer: ",
      createOrder
    );
  } catch (error) {
    console.log("Error", error);
    return errorResponse(res, 500, "Something went wrong");
  }
};

module.exports = { order };

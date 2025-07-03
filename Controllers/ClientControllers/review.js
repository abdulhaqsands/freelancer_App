const prisma = require("../../Config/prisma");
const {
  errorResponse,
  successResponse,
} = require("../../Config/errorHandling");

const reviewUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;
    const { rating } = req.body;
    console.log("USer: ", userId);

    if (rating < 1 || rating > 5) {
      console.log("Rating Greater than 1 and less than 5: ");
      return errorResponse(res, 400, "Rating must be between 1 and 5.");
    }
    const orderExist = await prisma.order.findUnique({
      where: { id: parseInt(orderId) },
    });
    if (!orderExist) return errorResponse(res, 401, "No Found Order: ");

    const reviewExist = await prisma.review.findFirst({
      where: { orderId: parseInt(orderId) },
    });

    if (reviewExist) {
      const updatedReview = await prisma.review.update({
        where: { orderId: parseInt(orderId) },
        data: { rating },
      });
      return successResponse(res, 201, "Rated", { updatedReview });
    } else {
      const newReview = await prisma.review.create({
        data: { orderId: parseInt(orderId), rating },
      });
      return successResponse(res, 201, "Review created.", { newReview });
    }
  } catch (error) {
    console.log("Error", error);
    return errorResponse(res, 500, "Something Went Wrong: ");
  }
};
module.exports = { reviewUser };

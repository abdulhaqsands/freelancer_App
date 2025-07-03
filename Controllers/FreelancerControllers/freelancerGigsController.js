const prisma = require("../../Config/prisma");
const {
  errorResponse,
  successResponse,
} = require("../../Config/errorHandling");
const path = require("path");
const { createGigsSchema } = require("../../Validations/freeLancerValidations");

const createGigs = async (req, res) => {
  const { error } = createGigsSchema.validate(req.body);
  if (error) return errorResponse(res, 400, error.details[0].message);
  try {
    const userId = req.user.id;
    const { title, description, category, price, deliveryDays } = req.body;
    const existUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!existUser) return errorResponse(res, 401, "Unauthorized");
    const file = req.file;
    if (!file) return errorResponse(res, 400, "Image is required");

    const imagePath = `uploads/${file.filename}`;
    const createGig = await prisma.gig.create({
      data: {
        title,
        description,
        deliveryDays: parseInt(deliveryDays),
        price: parseInt(price),
        category,
        image: imagePath,
        userId,
      },
    });
    return successResponse(res, 201, "Gig Created:", createGig);
  } catch (error) {
    console.log("Error", error);
    return errorResponse(res, 500, "Something Went Wrong: ");
  }
};
const getGigs = async (req, res) => {
  try {
    const userId = req.user.id;
    const existUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!existUser) return errorResponse(res, 401, "Unauthorized User: ");
    const getGigs = await prisma.gig.findMany({
      where: { userId },
    });
    return successResponse(res, 200, "All Gigs: ", { getGigs });
  } catch (error) {
    console.log("Error", error);
    return errorResponse(res, 500, "Something Went Wrong: ");
  }
};
const updateGig = async (req, res) => {
  try {
    const userId = req.user.id;
    const gigId = parseInt(req.params.id);
    const { title, description, category, price, deliveryDays } = req.body;

    const existGig = await prisma.gig.findFirst({
      where: { id: gigId, userId },
    });
    if (!existGig) return errorResponse(res, 401, "no gig found:");

    const updateGig = await prisma.gig.updateMany({
      where: { id: gigId },
      data: {
        title,
        description,
        category,
        price,
        deliveryDays,
      },
    });
    return successResponse(res, 201, "Gig Updated", updateGig);
  } catch (error) {
    console.log("Error", error);
    return errorResponse(res, 500, "Something Went Wrong: ");
  }
};
const deleteGig = async (req, res) => {
  try {
    const userId = req.user.id;
    const gigId = parseInt(req.params.id);
    

    const existGig = await prisma.gig.findFirst({ where: { id: gigId,userId} });

    if (!existGig) return errorResponse(res, 401, "no gig found:");

    await prisma.gig.delete({ where: { id: gigId } });

    return successResponse(res, 201, "Gig Deleted Successfull", deleteGig);
  } catch (error) {
    console.log("Error", error);
    return errorResponse(res, 500, "Something Went Wrong: ");
  }
};

module.exports = { createGigs, updateGig, getGigs, deleteGig };
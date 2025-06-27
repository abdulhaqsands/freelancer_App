const prisma = require("../Config/prisma");
const {
  sendingOtpSchema,
  verifyOtpSchema,
  loginUserSchema,
  userDetailsSchema,
  forgetPasswordSchema,
  setNewPasswordSchema,
} = require("../Validations/authValidations");
const bcrypt = require("bcrypt");
const { errorResponse, successResponse } = require("../Config/errorHandling");
const { generateOtp } = require("../Utils/generateOtp");
const { generateExpiry } = require("../Utils/generateExpiry");
const { sendOtp } = require("../Utils/nodeMailer");
const generateJWT = require("../Utils/generateJWT");

const sendOtpToEmail = async (req, res) => {
  const { error } = sendingOtpSchema.validate(req.body);
  if (error) return errorResponse(res, 400, error.details[0].message);
  try {
    const { email } = req.body;
    const existEmail = await prisma.user.findFirst({
      where: { email },
    });
    if (existEmail) return errorResponse(res, 409, "Duplicate Email");
    const otp = generateOtp();
    const expiry = generateExpiry();
    sendOtp(email, otp);
    const createOtp = await prisma.otp.create({
      data: {
        email,
        otp: parseInt(otp),
        expiry,
      },
    });
    return successResponse(res, 201, "Otp send SuccessFully", createOtp);
  } catch (error) {
    console.log("Error", error);
    errorResponse(res, 500, "Something Went Wrong: ");
  }
};
const verifyOtp = async (req, res) => {
  const { error } = verifyOtpSchema.validate(req.body);
  if (error) return errorResponse(res, 400, error.details[0].message);
  try {
    const { email, password, role, otp } = req.body;
    const findEmail = await prisma.otp.findFirst({
      where: { email, otp },
    });
    if (!findEmail) return errorResponse(res, 401, "Unauthorized");
    if (findEmail.expiry < new Date())
      return errorResponse(res, 401, "Invalid Token");
    const hashed = await bcrypt.hash(password, 10);
    const createUser = await prisma.user.create({
      data: {
        email,
        password: hashed,
        role,
      },
    });
    await prisma.otp.deleteMany({
      where: { email },
    });
    return successResponse(res, 201, "User Registered SuccessFull", {
      createUser: {
        email,
        role,
      },
    });
  } catch (error) {
    console.log("Error", error);
    return errorResponse(res, 500, "Something went Wrong");
  }
};
const loginUser = async (req, res) => {
  const { error } = loginUserSchema.validate(req.body);
  if (error) return errorResponse(res, 400, error.details[0].message);
  try {
    const { email, password, role } = req.body;
    const existEmail = await prisma.user.findFirst({
      where: { email, role },
    });
    if (!existEmail) return errorResponse(res, 401, "Unauthorized User");

    const isMAtch = await bcrypt.compare(password, existEmail.password);
    if (!isMAtch) return errorResponse(res, 401, "Invalid Password");
    const token = generateJWT({ id: existEmail.id, role: existEmail.role });
    return successResponse(
      res,
      200,
      "User Login SuccessFull",
      { email },
      token
    );
  } catch (error) {
    console.log("Error", error);
    return errorResponse(res, 500, "Something Went Wrong: ");
  }
};
const forgetPassword = async (req, res) => {
  const { error } = forgetPasswordSchema.validate(req.body);
  if (error) return errorResponse(res, 400, error.details[0].message);

  try {
    // const userId=req.user.id;
    const { email } = req.body;
    const existUser = await prisma.user.findFirst({
      where: { email },
    });
    if (!existUser) return errorResponse(res, 401, "Unauthorized User");

    const otp = generateOtp();
    const expiry = generateExpiry();

    await sendOtp(email, otp);
    await prisma.otp.create({
      data: {
        email,
        otp:parseInt(otp),
        expiry,
      },
    });
    return successResponse(res, 201, "Otp send to your Email");
  } catch (error) {
    console.log("Error", error);
    return errorResponse(res, 500, "Something went wrong");
  }
};
const userDetails = async (req, res) => {
  const { error } = userDetailsSchema.validate(req.body);
  if (error) return errorResponse(res, 400, error.details[0].message);
  try {
    const {
      profileImage,
      phone,
      bio,
      location,
      experience,
      education,
      languages,
    } = req.body;
    const userId = req.user.id;
    const existUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!existUser) return errorResponse(res, 401, "Unauthorized USer");

    const createUserDetails = await prisma.userDetails.create({
      data: {
        profileImage,
        phone,
        bio,
        location,
        experience,
        education,
        languages,
        userId,
      },
    });
    return successResponse(res, 201, "User Details Updated", {
      createUserDetails,
    });
  } catch (error) {
    console.log("Error", error);
    return errorResponse(res, 500, "Something Went Wrong: ");
  }
};

const setNewPassword=async(req,res)=>{

    const {error} =setNewPasswordSchema.validate(req.body);
    if(error) return errorResponse(res,400,error.details[0].message);
    try {
      const {email,newPassword,otp}=req.body;
      const existUser=await prisma.user.findFirst({
        where:{email}
      });
      if(!existUser) return errorResponse(res,401,"Unauthorized User");
      const existOtp=await prisma.otp.findFirst({
        where:{email,otp}
      });
      if(existOtp.expiry< new Date()) return errorResponse(res,401,"Otp Expired: ");
      if(!existOtp) return errorResponse(res,401,"Invalid ");
      const hashed=await bcrypt.hash(newPassword,10);
      const updatePassword=await prisma.user.update({
        where:{id:existUser.id},
        data:{password:hashed}
      });
      await prisma.otp.deleteMany({
        where:{email}
      })
      return successResponse(res,201,"Updated Password",updatePassword)


      
    } catch (error) {
      console.log("Error",error);
      return errorResponse(res,500,"Something Went Wrong")
    }


}

module.exports = {
  sendOtpToEmail,
  verifyOtp,
  loginUser,
  userDetails,
  forgetPassword,
  setNewPassword
};

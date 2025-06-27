const authRoute=require("express").Router();
const authController=require("../Controllers/authController")
const verifyToken=require("../Middlewares/verifyToken")


authRoute.post("/sending-otp",authController.sendOtpToEmail);
authRoute.post("/verify-otp",authController.verifyOtp);
authRoute.post("/login-user",authController.loginUser);
authRoute.post("/forget-password",authController.forgetPassword);
authRoute.post("/user-details",verifyToken,authController.userDetails);
authRoute.post("/set-newPassword",authController.setNewPassword);

module.exports=authRoute;
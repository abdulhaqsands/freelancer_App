const authRoute=require("express").Router();
const authController=require("../Controllers/authController");
const verifyToken=require("../Middlewares/verifyToken");
const imageUpload = require("../Utils/profileImage");


authRoute.post("/sending-otp",authController.sendOtpToEmail);
authRoute.post("/verify-otp",authController.verifyOtp);
authRoute.post("/login-user",authController.loginUser);
authRoute.post("/forget-password",authController.forgetPassword);
authRoute.post("/user-details",verifyToken, imageUpload.single("profileImage"),authController.userDetails);
authRoute.post("/set-newPassword",authController.setNewPassword);
authRoute.post("/block-user",verifyToken,authController.blockUser);
authRoute.get("/get-profile",verifyToken,authController.getProfile);
authRoute.put("/update-profile",verifyToken,authController.updateUserDetails);


module.exports=authRoute;
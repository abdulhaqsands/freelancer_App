const joi=require("joi");

const sendingOtpSchema=joi.object({
    email:joi.string().email().required()
});
const verifyOtpSchema=joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(6).required(),
    role:joi.valid("ADMIN","FREELANCER","CLIENT").required(),
    otp:joi.number().min(6).required(),
});
const loginUserSchema=joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(6).required(),
    role:joi.valid("FREELANCER","CLIENT","ADMIN")
});
const userDetailsSchema=joi.object({
  profileImage:joi.string().optional(),
  phone:joi.string().min(11).required(),
  bio:joi.string().optional(),
  location:joi.string().required(),
  experience:joi.string().optional(),
  education:joi.string().required(),
  languages:joi.string().valid("English","Urdu").optional()
});
const forgetPasswordSchema=joi.object({
    email:joi.string().email().required(),
   // newPassword:joi.string().min(6).required()
});
const setNewPasswordSchema=joi.object({
   email:joi.string().email().required(),
   newPassword:joi.number().min(6).required(),
       otp:joi.number().min(6).required(),


});
module.exports={
    sendingOtpSchema,
    verifyOtpSchema,
    loginUserSchema,
    userDetailsSchema,
    forgetPasswordSchema,
    setNewPasswordSchema

}
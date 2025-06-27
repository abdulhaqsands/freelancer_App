const nodemailer=require("nodemailer");
const { USER_EMAIL, USER_PASS } = require("../Config/config");

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:USER_EMAIL,
        pass:USER_PASS
    }
});

const sendOtp=(email,otp)=>{
    transporter.sendMail({
        from:USER_EMAIL,
        to:email,
        subject:"Your Otp send",
        text:`Otp is ${otp}`
    });
}

module.exports={
    sendOtp
}
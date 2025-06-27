const jwt=require("jsonwebtoken");
const { SECRET_KEY } = require("../Config/config");
const generateJWT=(payload)=>{
    return jwt.sign(payload,SECRET_KEY,{expiresIn:'1h'});
}
module.exports=generateJWT;
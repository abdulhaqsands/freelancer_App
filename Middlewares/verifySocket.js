const prisma = require("../Config/prisma");
const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("../Config/config");
const { errorResponse } = require("../Config/errorHandling");

const SocketAuth = async (socket, next) => {
  let token;
  try {
    if (
      socket.handshake.headers?.token &&
      socket.handshake.headers?.token.startsWith("Bearer ")
    ) {
      token = socket.handshake.headers?.token.split(" ")[1];
    }
    const decode = jwt.verify(token, SECRET_KEY);
    console.log("id", decode.id);
    const user = await prisma.user.findUnique({
      where:{id: parseInt(decode.id)},
    });
    if (!user) return next(new Error("Unauthorized user"));
    delete user.password;
    socket.user = user; // for full info
    socket.userId = user.id; // for quick access
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new Error("Token expired"));
    }
    if (error.name === "JsonWebTokenError") {
      return next(new Error("Invalid token"));
    } else {
      console.log(`error in authenticated middleware :: ${error.message}`);
    }
  //  return errorResponse(req, 500, "SomeThing Went Wrong: ");
  }
};
module.exports = { SocketAuth };

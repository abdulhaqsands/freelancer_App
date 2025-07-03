const { SocketAuth } = require("../Middlewares/verifySocket");
const { JOIN_USER_ROOM } = require("./Constants/eventConstants");
const { privateMessage } = require("./Handlers/privateMessage");
const onlineUsers = require("./Utils/onlineUsers");


const socketHandler = (io) => {
  io.use(SocketAuth);
  io.on("connection", (socket) => {
    console.log("New User Connected:", socket.id);
    console.log("Authenticated UserId:", socket.userId);

    if (!socket.userId) {
      console.log("UserId missing in socket connection");
      socket.disconnect();
      return;
    }
    onlineUsers.set(socket.userId, socket.id);
    console.log(`User ${socket.userId} connected with Socket:id ${socket.id}`);

    privateMessage(socket, io);

    socket.on("disconnect", () => {
      if (socket.userId) {
        onlineUsers.delete(socket.userId);
        console.log(`User ${socket.userId} disconnected`);
      }
    });
  });
};
module.exports = { socketHandler };


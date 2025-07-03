const { PRIVATE_MSG, REC_PRI_MSG } = require("../Constants/eventConstants");
const onlineUsers = require("../Utils/onlineUsers");
const prisma = require("../../Config/prisma");

const  privateMessage = (socket, io) => {
  socket.on(PRIVATE_MSG, async ({ toUserId, message }) => {
    console.log("PRIVATE_MSG event received:", { toUserId, message });

    const fromUserId = socket.userId;
    const toScoketId = onlineUsers.get(toUserId);

    const payload = {
      fromUserId,
      message,
    };

    try {
      const chkBlocked = await prisma.block.findFirst({
        where: {
          blockerId: fromUserId,
          blockedId: toUserId,
        },
      });
     if (chkBlocked) {
        socket.emit(
          "message:error",
          "You can't send message ,This User is Blocked :"
        );
        return console.log("This User isBlocked ");
      
      }

      await prisma.message.create({
        data: {
          senderId: fromUserId,
          receiverId: toUserId,
          message,
        },
      });

      if (toScoketId) {
        io.to(toScoketId).emit(REC_PRI_MSG, payload);
        console.log(`Sent private message from ${fromUserId} to ${toUserId}`);
      } else {
        console.log(`User ${toUserId} is offline. Message can be stored.`);
      }
    } catch (error) {
      console.error("Error saving message to DB:", error.message);
    }
  });
};
module.exports = {
  privateMessage,
};
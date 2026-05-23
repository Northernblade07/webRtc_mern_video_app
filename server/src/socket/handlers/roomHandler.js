import EVENTS from "../events/socketEvents.js";

const roomHandler = (socket, io) => {
  socket.on(EVENTS.JOIN_ROOM, ({ roomId, userId }) => {
    socket.join(roomId);

    console.log(`${userId} joined room ${roomId}`);

    socket.to(roomId).emit(EVENTS.USER_JOINED, {
      userId,
      socketId: socket.id,
    });
  });

  socket.on(EVENTS.LEAVE_ROOM, ({ roomId, userId }) => {
    socket.leave(roomId);

    socket.to(roomId).emit(EVENTS.USER_LEFT, {
      userId,
    });

    console.log(`${userId} left room ${roomId}`);
  });
};

export default roomHandler;
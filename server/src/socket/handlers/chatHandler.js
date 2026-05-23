import EVENTS from "../events/socketEvents.js";

const chatHandler = (socket, io) => {
  socket.on(EVENTS.SEND_MESSAGE, (data) => {
    const { roomId, message, sender } = data;

    io.to(roomId).emit(EVENTS.RECEIVE_MESSAGE, {
      sender,
      message,
      timestamp: new Date(),
    });
  });
};

export default chatHandler;
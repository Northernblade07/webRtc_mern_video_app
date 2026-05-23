import EVENTS from "../events/socketEvents.js";

const signalingHandler = (socket, io) => {
  socket.on(EVENTS.SEND_OFFER, (data) => {
    const { roomId, offer } = data;

    socket.to(roomId).emit(EVENTS.RECEIVE_OFFER, {
      offer,
      senderId: socket.id,
    });
  });

  socket.on(EVENTS.SEND_ANSWER, (data) => {
    const { roomId, answer } = data;

    socket.to(roomId).emit(EVENTS.RECEIVE_ANSWER, {
      answer,
      senderId: socket.id,
    });
  });

  socket.on(EVENTS.ICE_CANDIDATE, (data) => {
    const { roomId, candidate } = data;

    socket.to(roomId).emit(EVENTS.ICE_CANDIDATE, {
      candidate,
      senderId: socket.id,
    });
  });
};

export default signalingHandler;
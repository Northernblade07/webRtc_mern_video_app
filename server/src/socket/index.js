import EVENTS from "./events/socketEvents.js";

import roomHandler from "./handlers/roomHandler.js";
import chatHandler from "./handlers/chatHandler.js";
import signalingHandler from "./handlers/signalingHandler.js";

const registerSocketHandlers = (io) => {
  io.on(EVENTS.CONNECTION , (socket)=>{
    console.log("new socket connected ", socket.id);

    roomHandler(socket, io);
    chatHandler(socket, io);
    signalingHandler(socket, io);

    socket.on(EVENTS.DISCONNECT, ()=>{
        console.log("socket disconnected" , socket.id)
    })
  })
};

export default registerSocketHandlers;

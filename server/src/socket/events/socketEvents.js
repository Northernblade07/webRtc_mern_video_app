const EVENTS = {
  CONNECTION: "connection",
  DISCONNECT: "disconnect",

  JOIN_ROOM: "join-room",
  LEAVE_ROOM: "leave-room",

  USER_JOINED: "user-joined",
  USER_LEFT: "user-left",

  SEND_MESSAGE: "send-message",
  RECEIVE_MESSAGE: "receive-message",

  SEND_OFFER: "send-offer",
  RECEIVE_OFFER: "receive-offer",

  SEND_ANSWER: "send-answer",
  RECEIVE_ANSWER: "receive-answer",

  ICE_CANDIDATE: "ice-candidate",
};

export default EVENTS;
import http from 'http'
import app from "./index.js"
import {Server} from "socket.io"
import dotenv from 'dotenv'
import registerSocketHandlers from './socket/index.js';
dotenv.config();

const server = http.createServer(app);

const PORT  = process.env.PORT || 6000;

const io = new Server(server,{
    cors:{
        origin:"*",
        methods :["GET" ,"POST"]
    },
});

registerSocketHandlers(io);

server.listen(PORT , ()=>{
    console.log("Server is running on" , PORT);
})

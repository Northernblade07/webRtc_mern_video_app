import http from 'http'
import app from "./index.js"
import {Server} from "socket.io"
import dotenv from 'dotenv'
dotenv.config();

const server = http.createServer(app);

const PORT  = process.env.PORT || 6000;

const io = new Server(server,{
    cors:{
        origin:"*",
        methods :["GET" ,"POST"]
    },
});


server.listen(PORT , ()=>{
    console.log("Server is running on" , PORT);
})

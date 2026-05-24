import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react"
import { useContext } from "react"
import {io} from 'socket.io-client'

const Url = "http://localhost:6001"
// we create a context for the socket using createContext method and passing null as initial value
//  this socketContext will be passed to useContext when creating a custom hook for socket
const SocketContext = createContext(null)

// then create a custom hook for future use socket using 
// useContext method and passing the socketContext we created above 
export const useSocket = ()=>{
    return useContext(SocketContext);
}


// then we have to create a provider for the socketContext and then return socketContext.Provider with value attribute 
export const SocketProvider = ({children})=>{
    const [socket ,SetSocket] = useState(null);

    useEffect(()=>{
        const newSocket = io(Url);
        SetSocket(newSocket);

        return ()=>{
            newSocket.disconnect()
        }
    },[])


    return (
        <SocketContext.Provider value={socket}>
        {socket ? children : <div className="h-screen bg-slate-950 flex items-center justify-center text-white">Connecting to server...</div>}        
        </SocketContext.Provider> 
    )

}
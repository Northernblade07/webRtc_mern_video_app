import React from 'react'
import Navbar from '../components/Navbar'
import {motion} from "framer-motion"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Home = () => {

    const [roomId, setRoomId] = useState('');

    const navigate = useNavigate()
    const joinRoom = (Id = roomId)=>{
        console.log(roomId)
        console.log(Id)
        if(!Id) return;
        if(Id){
            navigate(`/room/${Id}`)
        }

    }

    const generateRandomString = (length=6) => {
  const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    result += charSet.charAt(randomIndex);
  }
   setRoomId(result);

   joinRoom(result)
   console.log(roomId)
};

  return (
    <div className='min-h-screen relative'>

        <Navbar/>
      <div className="flex flex-col items-center justify-center h-[85vh] px-4">
            <motion.h1 
            initial={{opacity:0 , y:50}}
            animate={{opacity:1 , y:0}}
            transition={{duration : 1}}
            className="text-6xl md:text-7xl font-black text-center leading-tight"
            
            >
                Next Gen


                
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {' '} Meetings
                </span>
            </motion.h1>


            <motion.p
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:0.5}}
            className="mt-6 text-gray-400 text-center max-w-xl"
            >
          Realtime video conferencing powered by WebRTC and Socket.IO
            </motion.p>

            <motion.div
            initial={{opacity:0 , y:40}}
            animate={{opacity:1 , y:0}}
            transition={{duration:0.8}}
            className="glass mt-12 p-8 rounded-3xl w-full max-w-lg"
            >

                <input 
                type="text"
                className="w-full px-5 py-4 rounded-2xl bg-slate-900 border border-slate-700 outline-none text-amber-50"
                placeholder='Enter Room id'
                value={roomId}
                onChange={(e)=>setRoomId(e.target.value)}
                
                />


                    <button
                className="w-full mt-5 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 font-semibold hover:scale-105 transition-all duration-300 animate-glow"
                onClick={()=>generateRandomString()}
                >
                    Create an Instant Meeting
                </button>


                <button
                className="w-full mt-5 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 font-semibold hover:scale-105 transition-all duration-300 animate-glow"
                onClick={()=>joinRoom()}
                >
                    Join Meeting
                </button>
            </motion.div>

        </div>

        

    </div>
  )
}

export default Home
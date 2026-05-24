import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { useSocket } from '../socket/SocketContext'
import VideoPlayer from '../components/VideoPlayer'
import Controls from '../components/Controls'
import AnimatedBackground from '../components/AnimatedBackground'
import RoomInfoModal from '../components/RoomInfoModal'

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
}
const Room = () => {
    const pendingCandidates = useRef([])
  const { roomId } = useParams()
  const navigate = useNavigate()

  const socket = useSocket()

  console.log('SOCKET:', socket)
console.log('SOCKET CONNECTED:', socket?.connected)

  const [stream, setStream] = useState(null)
  const [remoteStream, setRemoteStream] = useState(null)

  const [micOn, setMicOn] = useState(true)
  const [cameraOn, setCameraOn] = useState(true)

  const peerConnectionRef = useRef(null)
  const localStreamRef = useRef(null)

    const [isModalOpen, setIsModalOpen] = useState(true);


  useEffect(() => {
    if (!socket) return

    console.log('ROOM EFFECT RUNNING')
    console.log("socket" , socket)
    const initWebRTC = async () => {
      try {
        console.log('INIT WEBRTC RUNNING')
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })
        
        setStream(mediaStream)
        localStreamRef.current = mediaStream

        peerConnectionRef.current = new RTCPeerConnection(servers)

        // --- DEBUGGING LOGS ---
        peerConnectionRef.current.onconnectionstatechange = () => {
          console.log('Connection State:', peerConnectionRef.current.connectionState)
        }

        peerConnectionRef.current.oniceconnectionstatechange = () => {
          console.log('ICE Connection State:', peerConnectionRef.current.iceConnectionState)
        }

        mediaStream.getTracks().forEach((track) => {
          peerConnectionRef.current.addTrack(track, mediaStream)
        })

        // 5. Listen for remote tracks coming from the other user
        peerConnectionRef.current.ontrack = (event) => {
          console.log('📡 REMOTE TRACK RECEIVED:', event)
          const remote = event.streams[0]
          if (remote) {
            setRemoteStream(remote)
          }
        }

        peerConnectionRef.current.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit('ice-candidate', { candidate: event.candidate, roomId })
          }
        }

        socket.on('user-joined', async ({ userId }) => {
            console.log("user joined")
          console.log('User joined:', userId)
          const offer = await peerConnectionRef.current.createOffer()
          await peerConnectionRef.current.setLocalDescription(offer)
          socket.emit('send-offer', { offer, roomId })
        })

      socket.on('receive-offer', async ({ offer }) => {

        console.log("recieve offered")
  await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer))
  
  // Flush the queue immediately after setting the description
  pendingCandidates.current.forEach(async (c) => await peerConnectionRef.current.addIceCandidate(c))
  pendingCandidates.current = [] // Clear the queue

  const answer = await peerConnectionRef.current.createAnswer()
  await peerConnectionRef.current.setLocalDescription(answer)
  socket.emit('send-answer', { answer, roomId })
})

socket.on('receive-answer', async ({ answer }) => {
          try {

            console.log("answer recived")
            // Check the official WebRTC signaling state instead
            if (peerConnectionRef.current.signalingState === 'have-local-offer') {
              await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer))
              
              // Flush the queue 
              if (pendingCandidates.current.length > 0) {
                pendingCandidates.current.forEach(async (c) => await peerConnectionRef.current.addIceCandidate(c))
                pendingCandidates.current = [] 
              }
            }
          } catch (error) {
            console.error('Error setting remote description:', error)
          }
        })

        // --- FIXED: ICE Candidate Race Condition ---
       socket.on('ice-candidate', async ({ candidate }) => {
  try {
    if (!candidate) return

    console.log("ice candidate ")

    const rtcCandidate = new RTCIceCandidate(candidate)
    
    // If we have the remote description, add it immediately
    if (peerConnectionRef.current?.remoteDescription) {
      await peerConnectionRef.current.addIceCandidate(rtcCandidate)
    } else {
      // Otherwise, save it for later
      console.log('Remote description missing, queuing ICE candidate...')
      pendingCandidates.current.push(rtcCandidate)
    }
  } catch (error) {
    console.error('Error handling ICE candidate:', error)
  }
})

        // --- FIXED: Safe Socket Emission ---
        if (socket.connected) {
          socket.emit('join-room', { roomId, userId: socket.id })
        } else {
          socket.on('connect', () => {
            socket.emit('join-room', { roomId, userId: socket.id })
          })
        }

      } catch (error) {
        console.error('Error accessing media devices.', error)
      }
    }

    initWebRTC()

    return () => {
      if (socket) {
        socket.emit('leave-room', { roomId, userId: socket.id })
        socket.off('user-joined')
        socket.off('receive-offer')
        socket.off('receive-answer')
        socket.off('ice-candidate')
      }
      
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close()
      }

      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [roomId, socket])

  // --- FIXED: Safe Media Track Toggling ---
  const toggleMic = () => {
    const audioTrack = stream?.getAudioTracks()?.[0]
    if (audioTrack) {
      audioTrack.enabled = !micOn
      setMicOn(!micOn)
    }
  }

  const toggleCamera = () => {
    const videoTrack = stream?.getVideoTracks()?.[0]
    if (videoTrack) {
      videoTrack.enabled = !cameraOn
      setCameraOn(!cameraOn)
    }
  }

  const leaveRoom = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen p-5 relative">
      <AnimatedBackground />

      <div className={`grid gap-5 h-[80vh] ${remoteStream ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-4xl mx-auto'}`}>
        {stream && <VideoPlayer stream={stream} isLocal={true} />}
        {remoteStream && <VideoPlayer stream={remoteStream} isLocal={false} />}
      </div>

      <Controls
        micOn={micOn}
        cameraOn={cameraOn}
        toggleMic={toggleMic}
        toggleCamera={toggleCamera}
        leaveRoom={leaveRoom}
      />


       <RoomInfoModal 
        roomId={roomId} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  )
}

export default Room
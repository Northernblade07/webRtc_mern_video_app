import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
} from 'lucide-react'

const Controls = ({
  micOn,
  cameraOn,
  toggleMic,
  toggleCamera,
  leaveRoom,
}) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 glass px-6 py-4 rounded-full flex items-center gap-5 text-amber-50">
      <button
        onClick={toggleMic}
        className="p-4 rounded-full bg-slate-800 hover:bg-slate-700 transition"
      >
        {micOn ? <Mic /> : <MicOff />}
      </button>

      <button
        onClick={toggleCamera}
        className="p-4 rounded-full bg-slate-800 hover:bg-slate-700 transition"
      >
        {cameraOn ? <Video /> : <VideoOff />}
      </button>

      <button
        onClick={leaveRoom}
        className="p-4 rounded-full bg-red-600 hover:bg-red-500 transition"
      >
        <PhoneOff />
      </button>
    </div>
  )
}

export default Controls
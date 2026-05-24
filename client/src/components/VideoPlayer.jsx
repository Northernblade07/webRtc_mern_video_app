import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const VideoPlayer = ({ stream, isLocal }) => {
  const videoRef = useRef(null)

  useEffect(() => {
    // When the stream arrives or changes, attach it to the video element
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative rounded-3xl overflow-hidden glass"
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isLocal}
        className="w-full h-full object-cover"
      />

      <div className="absolute bottom-3 left-3 bg-black/40 px-3 py-1 rounded-xl text-sm">
        {isLocal ? 'You' : 'Participant'}
      </div>
    </motion.div>
  )
}

export default VideoPlayer
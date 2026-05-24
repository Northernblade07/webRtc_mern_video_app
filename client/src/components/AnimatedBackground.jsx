import { motion } from 'framer-motion'

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      <motion.div
        animate={{
          x: [0, 100, -100, 0],
          y: [0, -100, 100, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
        }}
        className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 top-10 left-10"
      />

      <motion.div
        animate={{
          x: [0, -100, 100, 0],
          y: [0, 100, -100, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
        }}
        className="absolute w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20 bottom-10 right-10"
      />
    </div>
  )
}

export default AnimatedBackground
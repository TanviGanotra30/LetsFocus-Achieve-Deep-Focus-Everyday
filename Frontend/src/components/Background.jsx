import { motion } from "framer-motion"

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#030712]">
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Left Purple Glow */}
      <motion.div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[140px] opacity-30 bg-purple-600"
        animate={{
          x: [0, 60, 0],
          y: [0, 50, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Right Cyan Glow */}
      <motion.div
        className="absolute top-1/4 -right-32 w-[650px] h-[650px] rounded-full blur-[150px] opacity-25 bg-cyan-500"
        animate={{
          x: [0, -70, 0],
          y: [0, -40, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Center Indigo Glow */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 bg-indigo-500"
        animate={{
          x: [0, 40, 0],
          y: [0, -60, 0],
          scale: [1, 1.1, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Bottom Purple Glow */}
      <motion.div
        className="absolute bottom-0 left-1/4 w-[550px] h-[550px] rounded-full blur-[150px] opacity-20 bg-fuchsia-500"
        animate={{
          x: [0, -30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Vignette Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
    </div>
  )
}
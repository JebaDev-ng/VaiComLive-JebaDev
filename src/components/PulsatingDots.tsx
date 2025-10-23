import { motion } from "framer-motion";

function PulsatingDots(): JSX.Element {
  return (
    <div className="flex items-center justify-center">
      <div className="flex space-x-3">
        <motion.div
          className="h-4 w-4 rounded-full bg-[#ff004d]"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          style={{
            filter: "drop-shadow(0 0 8px rgba(255, 0, 77, 0.6))",
          }}
        />
        <motion.div
          className="h-4 w-4 rounded-full bg-[#f9c550]"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 0.3,
          }}
          style={{
            filter: "drop-shadow(0 0 8px rgba(249, 197, 80, 0.6))",
          }}
        />
        <motion.div
          className="h-4 w-4 rounded-full bg-[#ff004d]"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 0.6,
          }}
          style={{
            filter: "drop-shadow(0 0 8px rgba(255, 0, 77, 0.6))",
          }}
        />
      </div>
    </div>
  );
}

export default PulsatingDots;

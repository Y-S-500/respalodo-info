"use client"

import { motion } from "framer-motion"
import { Code, Database, Globe, Smartphone, Server, Zap } from "lucide-react"

const techIcons = [
  { Icon: Code, delay: 0, x: -100, y: -50 },
  { Icon: Database, delay: 0.5, x: 100, y: -80 },
  { Icon: Globe, delay: 1, x: -80, y: 60 },
  { Icon: Smartphone, delay: 1.5, x: 120, y: 40 },
  { Icon: Server, delay: 2, x: -120, y: -20 },
  { Icon: Zap, delay: 2.5, x: 80, y: -120 },
]

export default function FloatingTechIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {techIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute top-1/2 left-1/2 text-muted-foreground/20"
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: [0, x, x * 1.5],
            y: [0, y, y * 1.5],
          }}
          transition={{
            duration: 8,
            delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Icon className="h-8 w-8" />
        </motion.div>
      ))}
    </div>
  )
}

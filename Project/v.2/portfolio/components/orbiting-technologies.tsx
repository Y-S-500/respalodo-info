"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface Technology {
  name: string
  color: string
  radius: number
  speed: number
  delay: number
}

const technologies: Technology[] = [
  // Órbita interior (más rápida) - Tecnologías principales
  { name: "C#", color: "bg-purple-600", radius: 180, speed: 20, delay: 0 },
  { name: ".NET", color: "bg-blue-700", radius: 180, speed: 20, delay: 5 },
  { name: "SQL Server", color: "bg-red-600", radius: 180, speed: 20, delay: 10 },

  // Órbita media - Frontend y frameworks
  { name: "Angular", color: "bg-red-500", radius: 220, speed: 30, delay: 0 },
  { name: "TypeScript", color: "bg-blue-500", radius: 220, speed: 30, delay: 7.5 },
  { name: "Java", color: "bg-orange-600", radius: 220, speed: 30, delay: 15 },
  { name: "Spring Boot", color: "bg-green-600", radius: 220, speed: 30, delay: 22.5 },

  // Órbita exterior (más lenta) - Herramientas y tecnologías complementarias
  { name: "Azure", color: "bg-blue-400", radius: 260, speed: 40, delay: 0 },
  { name: "Git", color: "bg-orange-500", radius: 260, speed: 40, delay: 10 },
  { name: "Docker", color: "bg-blue-600", radius: 260, speed: 40, delay: 20 },
  { name: "PostgreSQL", color: "bg-blue-800", radius: 260, speed: 40, delay: 30 },
  { name: "MySQL", color: "bg-orange-400", radius: 260, speed: 40, delay: 35 },
]

export default function OrbitingTechnologies() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          className="absolute top-1/2 left-1/2"
          style={{
            width: tech.radius * 2,
            height: tech.radius * 2,
            marginLeft: -tech.radius,
            marginTop: -tech.radius,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: tech.speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: tech.delay,
          }}
        >
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.2, zIndex: 10 }}
          >
            <Badge
              className={`${tech.color} text-white text-xs px-2 py-1 shadow-lg pointer-events-auto cursor-pointer hover:shadow-xl transition-all duration-300`}
            >
              {tech.name}
            </Badge>
          </motion.div>
        </motion.div>
      ))}

      {/* Órbitas visuales sutiles */}
      {[180, 220, 260].map((radius, index) => (
        <motion.div
          key={radius}
          className="absolute top-1/2 left-1/2 border border-muted-foreground/10 rounded-full pointer-events-none"
          style={{
            width: radius * 2,
            height: radius * 2,
            marginLeft: -radius,
            marginTop: -radius,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.3, duration: 1 }}
        />
      ))}
    </div>
  )
}

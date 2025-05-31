"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import OrbitingTechnologies from "@/components/orbiting-technologies"
import FloatingTechIcons from "@/components/floating-tech-icons"

export default function EnhancedParallaxHero() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }
  const download = () => {
    const link = document.createElement("a");
    link.href = "/document/Currículum.pdf"; 
    link.download = "Yanuard-Stevin-CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="relative min-h-screen flex items-center py-20 md:py-28 px-4 overflow-hidden">
      {/* Enhanced Background elements with parallax effect */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/5"
          style={{
            transform: `translateY(${scrollY * 0.2}px) translateX(${mousePosition.x}px)`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gradient-to-l from-blue-600/15 to-purple-500/5"
          style={{
            transform: `translateY(${scrollY * -0.1}px) translateX(${-mousePosition.x}px)`,
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-blue-500/5"
          style={{
            transform: `translateY(${scrollY * 0.15}px) translateX(${mousePosition.y}px)`,
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      {/* Floating Tech Icons */}
      <FloatingTechIcons />

      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16 z-10">
        <motion.div className="flex-1 space-y-6" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants}>
            <Badge className="px-3 py-1 text-sm animate-pulse bg-green-500/20 text-green-700 border-green-500/30">
              ✨ Disponible para trabajar
            </Badge>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              Yanuard Stevin
            </h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary mt-2">
              Montialegre Bonilla
            </h2>
          </motion.div>
          <motion.h3 className="text-xl md:text-2xl font-semibold text-muted-foreground" variants={itemVariants}>
            Desarrollador Backend • C# & .NET Specialist
          </motion.h3>
          <motion.p className="text-lg text-muted-foreground max-w-md" variants={itemVariants}>
            Especializado en el ecosistema C# y .NET, creando soluciones backend robustas, escalables y eficientes.
            Apasionado por resolver problemas complejos con código limpio.
          </motion.p>
          <motion.div className="flex flex-wrap gap-3" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Link href="#contact">Contáctame</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" asChild className="border-purple-500/30 hover:bg-purple-500/5">
                <Link href="#projects">Ver Proyectos</Link>
              </Button>
            </motion.div>          
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={download}
                    variant="outline"
                    className="border-purple-500/30 hover:bg-purple-500/5"
                  >
                    Descargar CV
                  </Button>
                </motion.div>

          </motion.div>
          <motion.div className="flex gap-4 pt-2" variants={itemVariants}>
            <motion.div whileHover={{ y: -3, scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link href="https://github.com/Y-S-500" target="_blank" aria-label="GitHub">
                <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -3, scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link href="https://www.linkedin.com/in/yanuard-082004-dev" target="_blank" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -3, scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link href="mailto:bonillayanuard@gmail.com" aria-label="Email">
                <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Profile Image with Orbiting Technologies */}
        <div className="relative flex items-center justify-center">
          <motion.div
            className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden border-4 border-muted z-20 shadow-2xl"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              y: scrollY * -0.1,
              x: mousePosition.x * 0.5,
            }}
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <Image
              src="/profile.jpg?height=320&width=320"
              alt="Yanuard Stevin Montialegre Bonilla"
              fill
              className="object-cover"
              priority
            />
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </motion.div>

          {/* Orbiting Technologies Container */}
          <div className="absolute inset-0 w-[600px] h-[600px] flex items-center justify-center">
            <OrbitingTechnologies />
          </div>
        </div>
      </div>

      {/* Enhanced Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center relative"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <motion.div
            className="w-1 h-2 bg-muted-foreground rounded-full mt-2"
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          />
        </motion.div>
        <p className="text-xs text-muted-foreground mt-2 text-center">Scroll</p>
      </motion.div>
    </section>
  )
}

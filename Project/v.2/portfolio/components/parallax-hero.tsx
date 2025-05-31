"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import OrbitingTechnologies from "@/components/orbiting-technologies"

export default function ParallaxHero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="relative min-h-screen flex items-center py-20 md:py-28 px-4 overflow-hidden">
      {/* Background elements with parallax effect */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
        <div
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-primary/10"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-primary/5"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
      </div>

      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16 z-10">
        <motion.div className="flex-1 space-y-6" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants}>
            <Badge className="px-3 py-1 text-sm animate-pulse">Disponible para trabajar</Badge>
          </motion.div>
          <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight" variants={itemVariants}>
            Desarrollador Full Stack Junior
          </motion.h1>
          <motion.p className="text-lg text-muted-foreground max-w-md" variants={itemVariants}>
            Apasionado por crear soluciones web innovadoras y funcionales utilizando las tecnologías más modernas.
          </motion.p>
          <motion.div className="flex flex-wrap gap-3" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild>
                <Link href="#contact">Contáctame</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" asChild>
                <Link href="#projects">Ver Proyectos</Link>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div className="flex gap-4 pt-2" variants={itemVariants}>
            <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link href="https://github.com" target="_blank" aria-label="GitHub">
                <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link href="mailto:email@example.com" aria-label="Email">
                <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Profile Image with Orbiting Technologies */}
        <div className="relative">
          <motion.div
            className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden border-4 border-muted z-20"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ y: scrollY * -0.1 }}
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <Image
              src="/placeholder.svg?height=320&width=320"
              alt="Foto de perfil"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Orbiting Technologies */}
          <div className="absolute inset-0 w-[280px] h-[280px] md:w-[320px] md:h-[320px]">
            <OrbitingTechnologies />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <motion.div
            className="w-1 h-2 bg-muted-foreground rounded-full mt-2"
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

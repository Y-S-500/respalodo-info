"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Code, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="w-full border-t py-6 md:py-8 relative">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <div className="flex items-center space-x-2">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
            <Code className="h-5 w-5" />
          </motion.div>
          <span className="font-medium">MiPortfolio</span>
        </div>

        <p className="text-sm text-muted-foreground text-center md:text-left">
          &copy; {new Date().getFullYear()} MiPortfolio. Todos los derechos reservados.
        </p>

        <div className="flex items-center gap-4">
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
        </div>
      </div>

      <motion.div className="absolute right-4 bottom-4" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button size="icon" variant="outline" className="rounded-full" onClick={scrollToTop} aria-label="Volver arriba">
          <ArrowUp className="h-4 w-4" />
        </Button>
      </motion.div>
    </footer>
  )
}

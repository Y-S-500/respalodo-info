"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Code, Home, User, Briefcase, GraduationCap, Phone } from "lucide-react"
import { motion } from "framer-motion"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)

  const navItems = [
    { name: "Inicio", href: "#", icon: <Home className="h-4 w-4 mr-2" />, id: "home" },
    { name: "Sobre Mí", href: "#about", icon: <User className="h-4 w-4 mr-2" />, id: "about" },
    { name: "Habilidades", href: "#skills", icon: <Code className="h-4 w-4 mr-2" />, id: "skills" },
    { name: "Proyectos", href: "#projects", icon: <Code className="h-4 w-4 mr-2" />, id: "projects" },
    { name: "Experiencia", href: "#experience", icon: <Briefcase className="h-4 w-4 mr-2" />, id: "experience" },
    { name: "Educación", href: "#education", icon: <GraduationCap className="h-4 w-4 mr-2" />, id: "education" },
    { name: "Contacto", href: "#contact", icon: <Phone className="h-4 w-4 mr-2" />, id: "contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      // Detect if page is scrolled to add background to navbar
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Detect active section
      const sections = navItems.map((item) => item.id)

      for (const section of sections) {
        if (section === "home") continue
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section)
            break
          }
        }
      }

      // If at the top, set home as active
      if (window.scrollY < 100) {
        setActiveSection("home")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [navItems])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
            <Code className="h-6 w-6 text-purple-600" />
          </motion.div>
          <span className="font-bold text-xl">Yanuard Dev</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors relative ${
                activeSection === item.id ? "text-purple-600" : "hover:text-purple-600"
              }`}
            >
              {item.name}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild className="hidden md:flex bg-purple-600 hover:bg-purple-700">
              <Link href="#contact">Contáctame</Link>
            </Button>
          </motion.div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center text-sm font-medium transition-colors ${
                        activeSection === item.id ? "text-purple-600" : "hover:text-purple-600"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  <Button asChild className="mt-4 w-full bg-purple-600 hover:bg-purple-700">
                    <Link href="#contact" onClick={() => setIsOpen(false)}>
                      Contáctame
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}

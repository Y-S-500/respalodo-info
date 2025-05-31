"use client"

import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Send, Home, Phone, CheckCircle, AlertCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProjectCard from "@/components/project-card"
import SkillBadge from "@/components/skill-badge"
import AnimatedSection from "@/components/animated-section"
import EnhancedParallaxHero from "@/components/enhanced-parallax-hero"
import ScrollProgress from "@/components/scroll-progress"
import AnimatedCard from "@/components/animated-card"
import { toast } from "sonner"
import React, { useState } from "react"

interface FormData {
  nombre: string
  email: string
  phone: string
  mensaje: string
}

interface FormErrors {
  nombre?: string
  email?: string
  mensaje?: string
  general?: string
}

export default function Portfolio() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    phone: '',
    mensaje: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Validación de email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Validación de teléfono colombiano
  const validatePhone = (phone: string): boolean => {
    if (!phone) return true // Es opcional
    const phoneRegex = /^(\+57|57)?[\s-]?[3][0-9]{9}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }

  // Validar formulario completo
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio'
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres'
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Ingresa un email válido'
    }

    // Validar teléfono (opcional pero si se ingresa debe ser válido)
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.general = 'El teléfono debe ser un número colombiano válido (+57 300 123 4567)'
    }

    // Validar mensaje
    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es obligatorio'
    } else if (formData.mensaje.trim().length < 10) {
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Manejar cambios en los campos
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Limpiar error del campo cuando el usuario empiece a escribir
    
  }

  // Enviar formulario
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    // Validar antes de enviar
    if (!validateForm()) {
      toast.error("Por favor corrige los errores del formulario")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrors({})

    try {
      // Preparar datos para Brevo
      const brevoData = {
        sender: {
          name: "Formulario Portfolio",
          email: "bonillayanuard@gmail.com"
        },
        to: [
          {
            email: "bonillayanuard@gmail.com",
            name: "Yanuary Bonilla"
          }
        ],
        templateId: 2,
        params: {
          nombre: formData.nombre.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || "No proporcionado",
          mensaje: formData.mensaje.trim()
        }
      }

      console.log('Enviando datos a Brevo:', brevoData)

      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
          "api-key": "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"
        },
        body: JSON.stringify(brevoData)
      })

      const responseData = await response.json()
      console.log('Respuesta de Brevo:', responseData)

      if (response.ok) {
        setSubmitStatus('success')
        toast.success("¡Mensaje enviado exitosamente! Te contactaré pronto.")
        
        // Limpiar formulario
        setFormData({
          nombre: '',
          email: '',
          phone: '',
          mensaje: ''
        })
      } else {
        throw new Error(responseData.message || `Error HTTP: ${response.status}`)
      }

    } catch (error) {
      console.error('Error al enviar email:', error)
      setSubmitStatus('error')
      
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      setErrors({ general: `Error al enviar el mensaje: ${errorMessage}` })
      toast.error("Error al enviar el mensaje. Por favor intenta de nuevo.")
      
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <ScrollProgress />
      <Navbar />

      {/* Enhanced Hero Section with Orbiting Technologies */}
      <EnhancedParallaxHero />

      {/* About Section */}
      <AnimatedSection id="about" className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Sobre Mí</h2>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p className="text-lg leading-relaxed">
              Soy un desarrollador backend con sólida experiencia en el ecosistema <strong>C# y .NET</strong>,
              apasionado por la tecnología y motivado por los desafíos. Me entusiasma enfrentar situaciones que me
              exigen salir de mi zona de confort, aprender nuevas herramientas y metodologías, y mejorar continuamente
              mis habilidades.
            </p>
            <p className="text-lg leading-relaxed">
              Disfruto resolviendo problemas complejos con <strong>soluciones limpias, eficientes y escalables</strong>.
              Mi enfoque está en el desarrollo de aplicaciones robustas, APIs RESTful, optimización de bases de datos y
              buenas prácticas de arquitectura de software.
            </p>
            <p className="text-lg leading-relaxed">
              Estoy comprometido con la mejora continua y con aportar valor a proyectos significativos, manteniéndome
              actualizado con las últimas tendencias y tecnologías del desarrollo backend.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Skills Section */}
      <AnimatedSection id="skills" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Habilidades Técnicas</h2>

          <Tabs defaultValue="backend" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="database">Bases de Datos</TabsTrigger>
              <TabsTrigger value="tools">Herramientas</TabsTrigger>
            </TabsList>
            <TabsContent value="backend" className="mt-6">
              <div className="flex flex-wrap gap-2">
                <SkillBadge name="C#" level={95} />
                <SkillBadge name=".NET Framework" level={90} />
                <SkillBadge name=".NET Core" level={88} />
                <SkillBadge name="ASP.NET" level={85} />
                <SkillBadge name="Java" level={80} />
                <SkillBadge name="Spring Boot" level={75} />
                <SkillBadge name="APIs RESTful" level={90} />
                <SkillBadge name="Microservicios" level={80} />
              </div>
            </TabsContent>
            <TabsContent value="frontend" className="mt-6">
              <div className="flex flex-wrap gap-2">
                <SkillBadge name="Angular" level={85} />
                <SkillBadge name="TypeScript" level={80} />
                <SkillBadge name="JavaScript" level={85} />
                <SkillBadge name="React" level={75} />
                <SkillBadge name="HTML5" level={90} />
                <SkillBadge name="CSS3" level={85} />
                <SkillBadge name="Bootstrap" level={80} />
              </div>
            </TabsContent>
            <TabsContent value="database" className="mt-6">
              <div className="flex flex-wrap gap-2">
                <SkillBadge name="SQL Server" level={90} />
                <SkillBadge name="MySQL" level={85} />
                <SkillBadge name="PostgreSQL" level={80} />
                <SkillBadge name="Entity Framework" level={85} />
                <SkillBadge name="LINQ" level={88} />
                <SkillBadge name="Stored Procedures" level={82} />
              </div>
            </TabsContent>
            <TabsContent value="tools" className="mt-6">
              <div className="flex flex-wrap gap-2">
                <SkillBadge name="Git" level={90} />
                <SkillBadge name="GitHub" level={88} />
                <SkillBadge name="GitHub Actions" level={75} />
                <SkillBadge name="Visual Studio" level={95} />
                <SkillBadge name="Azure" level={80} />
                <SkillBadge name="Docker" level={70} />
                <SkillBadge name="Postman" level={85} />
                <SkillBadge name="SCRUM" level={80} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </AnimatedSection>

      {/* Projects Section */}
      <AnimatedSection id="projects" className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Proyectos Destacados</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard
              title="MatSystem"
              description="API RESTful desarrollada en .NET Core con arquitectura limpia, autenticación mediante JWT e integración con SQL Server. Incluye un frontend en Angular, diseñado con el objetivo de guiar a los aprendices del SENA en el proceso completo de matrículas."
              image="/project/matSystem.png?height=200&width=400"
              tags={["C#", ".NET Core", "SQL Server", "JWT", "Angular"]}
              demoUrl="https://example.com"
              repoUrl="https://github.com/Y-S-500"
              index={0}
            />

            <ProjectCard
              title="Gestion Sena"
              description="Proyecto para la gestión de los procesos formativos de los aprendices del SENA, incluyendo control de actividades y apoyo en la transición a la etapa productiva.
                    Tecnologías implementadas:
                    Backend: .NET Core, Arquitectura limpia, JWT, Entity Framework Core, SQL Server
                    Frontend: Angular, Bootstrap/Angular Material
                    Otros: Swagger, AutoMapper, CORS."
              image="/placeholder.svg?height=200&width=400"
              tags={["Spring Boot", "C#", "Docker", "Azure"]}
              demoUrl="https://example.com"
              repoUrl="https://github.com/Y-S-500"
              index={1}
            />

            <ProjectCard
              title="Pwa"
              description="PWA para la impresión de tiquetes en la nube, desarrollada en Angular. El sistema se conecta a una API REST para gestionar y enviar solicitudes de impresión a impresoras configuradas, permitiendo el control remoto desde cualquier dispositivo."
              image="/placeholder.svg?height=200&width=400"
              tags={["Angular", "TypeScript", ".NET","apis"]}
              demoUrl="https://example.com"
              repoUrl="https://github.com/Y-S-500"
              index={2}
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Experience Section */}
      <AnimatedSection id="experience" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Experiencia Laboral</h2>

          <div className="max-w-4xl mx-auto space-y-8">
            <AnimatedCard delay={0.1}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Desarrollador Full Stack</CardTitle>
                    <CardDescription>Coder Team SAS</CardDescription>
                  </div>
                  <Badge className="bg-green-500/20 text-green-700 border-green-500/30">2024 - 2025</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-3">
                  <li>
                    Brindé apoyo y colaboración activa al equipo de desarrollo, aportando conocimientos en{" "}
                    <strong>Angular y .NET con C#</strong>
                  </li>
                  <li>
                    Contribuí en el diseño, desarrollo e implementación de{" "}
                    <strong>soluciones eficientes y escalables</strong> en Angular y .NET
                  </li>
                  <li>
                    Proporcioné soporte técnico a desarrolladores, ayudando a resolver problemas de{" "}
                    <strong>integración de sistemas y optimización de código</strong>
                  </li>
                  <li>
                    Participé en la depuración y mejora del rendimiento de aplicaciones, asegurando{" "}
                    <strong>estabilidad, eficiencia y seguridad</strong>
                  </li>
                  <li>
                    Colaboré en la implementación de <strong>patrones de diseño y arquitecturas modernas</strong> para
                    mejorar la mantenibilidad del código
                  </li>
                  <li>
                    Apoyé en la capacitación del equipo, compartiendo conocimientos y mejores prácticas en frameworks y{" "}
                    <strong>metodologías ágiles</strong>
                  </li>
                  <li>
                    Brindé soporte en atención a clientes, resolviendo incidencias técnicas y garantizando una{" "}
                    <strong>experiencia satisfactoria</strong>
                  </li>
                </ul>
              </CardContent>
            </AnimatedCard>
          </div>
        </div>
      </AnimatedSection>

      {/* Education Section */}
      <AnimatedSection id="education" className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Educación y Certificaciones</h2>

          <div className="max-w-4xl mx-auto space-y-8">
            <AnimatedCard delay={0.1}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Ingeniería de Software</CardTitle>
                    <CardDescription>Universidad Iberoamericana de Colombia</CardDescription>
                  </div>
                  <Badge>2025</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  Formación integral en ingeniería de software, arquitectura de sistemas, metodologías de desarrollo y
                  gestión de proyectos tecnológicos.
                </p>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Tecnólogo en Desarrollo de Software</CardTitle>
                    <CardDescription>SENA - Servicio Nacional de Aprendizaje</CardDescription>
                  </div>
                  <Badge>2023 - 2025</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  Programa técnico especializado en desarrollo de software, programación orientada a objetos, bases de
                  datos y metodologías ágiles de desarrollo.
                </p>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard delay={0.3}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Técnico en Análisis y Desarrollo de Software</CardTitle>
                    <CardDescription>SENA - Servicio Nacional de Aprendizaje</CardDescription>
                  </div>
                  <Badge>2021 - 2022</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  Formación técnica en análisis de requerimientos, diseño de software, programación y testing de
                  aplicaciones.
                </p>
              </CardContent>
            </AnimatedCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <AnimatedCard delay={0.4}>
                <CardHeader>
                  <CardTitle className="text-lg">Fundamentos de Nube Azure</CardTitle>
                  <CardDescription>Universidad de los Andes</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">30 horas • Agosto - Septiembre 2022</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Certificación en servicios de nube, arquitectura Azure y mejores prácticas de cloud computing.
                  </p>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.5}>
                <CardHeader>
                  <CardTitle className="text-lg">Seguridad, Cumplimiento e Identidad de Microsoft</CardTitle>
                  <CardDescription>Universidad de los Andes</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">18 horas • Octubre 2022</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Especialización en seguridad informática, gestión de identidades y cumplimiento normativo.
                  </p>
                </CardContent>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection id="contact" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Contacto</h2>

          <div className="max-w-md mx-auto">
            <AnimatedCard delay={0.1}>
              <CardHeader>
                <CardTitle>Envíame un mensaje</CardTitle>
                <CardDescription>
                  Completa el formulario y me pondré en contacto contigo lo antes posible.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Mostrar alertas de estado */}
                {submitStatus === 'success' && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      ¡Mensaje enviado exitosamente! Te contactaré pronto.
                    </AlertDescription>
                  </Alert>
                )}

                {errors.general && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      {errors.general}
                    </AlertDescription>
                  </Alert>
                )}

                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                  {/* Campo Nombre */}
                  <div className="space-y-2">
                    <label htmlFor="nombre" className="text-sm font-medium">
                      Nombre *
                    </label>
                    <Input 
                      id="nombre" 
                      type="text"
                      placeholder="Tu nombre completo" 
                      value={formData.nombre}
                      onChange={(e) => handleInputChange('nombre', e.target.value)}
                      disabled={isSubmitting}
                      className={errors.nombre ? "border-red-500 focus:border-red-500" : ""}
                      aria-invalid={!!errors.nombre}
                      aria-describedby={errors.nombre ? "nombre-error" : undefined}
                    />
                    {errors.nombre && (
                      <p id="nombre-error" className="text-sm text-red-600">
                        {errors.nombre}
                      </p>
                    )}
                  </div>

                  {/* Campo Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email *
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="tu@email.com" 
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={isSubmitting}
                      className={errors.email ? "border-red-500 focus:border-red-500" : ""}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Campo Teléfono */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Teléfono (opcional)
                    </label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+57 300 123 4567" 
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-muted-foreground">
                      Formato: +57 seguido del número celular
                    </p>
                  </div>

                  {/* Campo Mensaje */}
                  <div className="space-y-2">
                    <label htmlFor="mensaje" className="text-sm font-medium">
                      Mensaje *
                    </label>
                    <Textarea 
                      id="mensaje" 
                      placeholder="Cuéntame sobre tu proyecto o consulta..." 
                      rows={4} 
                      value={formData.mensaje}
                      onChange={(e) => handleInputChange('mensaje', e.target.value)}
                      disabled={isSubmitting}
                      className={errors.mensaje ? "border-red-500 focus:border-red-500" : ""}
                      aria-invalid={!!errors.mensaje}
                      aria-describedby={errors.mensaje ? "mensaje-error" : undefined}
                    />
                    {errors.mensaje && (
                      <p id="mensaje-error" className="text-sm text-red-600">
                        {errors.mensaje}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Mínimo 10 caracteres
                    </p>
                  </div>

                  {/* Botón de envío */}
                  <Button 
                    type="submit" 
                    className="w-full group" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Enviando mensaje...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" /> 
                        Enviar Mensaje
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </AnimatedCard>

            {/* Información de contacto */}
            <div className="mt-8 flex flex-col space-y-4">
              <div className="flex items-center hover:translate-x-1 transition-transform cursor-pointer">
                <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                <a href="mailto:bonillayanuard@gmail.com" className="hover:text-primary">
                  bonillayanuard@gmail.com
                </a>
              </div>
              <div className="flex items-center hover:translate-x-1 transition-transform cursor-pointer">
                <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
                <a href="tel:+573157249401" className="hover:text-primary">
                  +57 315 724 9401
                </a>
              </div>
              <div className="flex items-center hover:translate-x-1 transition-transform">
                <Home className="h-5 w-5 mr-3 text-muted-foreground" />
                <span>Colombia</span>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  )
}
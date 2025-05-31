"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface SkillBadgeProps {
  name: string
  level: number
}

export default function SkillBadge({ name, level }: SkillBadgeProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(level)
    }, 300)
    return () => clearTimeout(timer)
  }, [level])

  return (
    <motion.div
      className="flex flex-col gap-1 w-full max-w-[180px]"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.03 }}
    >
      <Badge
        variant="outline"
        className={cn(
          "w-full justify-between py-1.5 px-3",
          level >= 80
            ? "border-green-200"
            : level >= 70
              ? "border-emerald-200"
              : level >= 60
                ? "border-yellow-200"
                : "border-orange-200",
        )}
      >
        <span>{name}</span>
        <motion.span
          className="text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {progress}%
        </motion.span>
      </Badge>
      <Progress
        value={progress}
        className={cn(
          "h-1.5",
          level >= 80
            ? "bg-green-100"
            : level >= 70
              ? "bg-emerald-100"
              : level >= 60
                ? "bg-yellow-100"
                : "bg-orange-100",
        )}
        indicatorClassName={cn(
          level >= 80
            ? "bg-green-500"
            : level >= 70
              ? "bg-emerald-500"
              : level >= 60
                ? "bg-yellow-500"
                : "bg-orange-500",
        )}
      />
    </motion.div>
  )
}

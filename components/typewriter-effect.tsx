"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"

interface TypewriterEffectProps {
  text: string
}

export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("")
  const controls = useAnimation()

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
        controls.start({ opacity: 1 })
      }
    }, 100)

    return () => clearInterval(interval)
  }, [text, controls])

  return (
    <motion.span className="animate-text" initial={{ opacity: 1 }} animate={controls} transition={{ duration: 0.5 }}>
      {displayedText}
    </motion.span>
  )
}


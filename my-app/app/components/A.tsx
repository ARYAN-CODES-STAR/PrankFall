"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface GravitatableElementProps {
  children: React.ReactNode
  enabled: boolean
  delay?: number
  className?: string
}

export function GravitatableElement({ children, enabled, delay = 0, className }: GravitatableElementProps) {
  const [falling, setFalling] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const elementRef = useRef<HTMLDivElement>(null)
  const velocityRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef<number | null>(null)

  // Random initial values for more natural movement
  useEffect(() => {
    if (enabled) {
      const timer = setTimeout(() => {
        setFalling(true)
        velocityRef.current = {
          x: (Math.random() - 0.5) * 2, // Small random horizontal velocity
          y: 0, // Start with zero vertical velocity
        }
        setRotation((Math.random() - 0.5) * 20) // Random initial rotation
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [enabled, delay])

  useEffect(() => {
    if (!falling) return

    const gravity = 0.2 // Gravity acceleration
    const friction = 0.98 // Friction to slow down movement
    const bounce = 0.7 // Bounce factor when hitting bottom

    const animate = () => {
      if (!elementRef.current) return

      // Update velocity with gravity
      velocityRef.current.y += gravity

      // Apply friction
      velocityRef.current.x *= friction

      // Update position
      setPosition((prev) => ({
        x: prev.x + velocityRef.current.x,
        y: prev.y + velocityRef.current.y,
      }))

      // Update rotation based on horizontal velocity
      setRotation((prev) => prev + velocityRef.current.x * 2)

      // Check if element hit the bottom of the viewport
      const rect = elementRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      if (rect.bottom + position.y > windowHeight) {
        // Bounce effect
        velocityRef.current.y = -velocityRef.current.y * bounce

        // Ensure element doesn't go below viewport
        setPosition((prev) => ({
          x: prev.x,
          y: prev.y - (rect.bottom + prev.y - windowHeight),
        }))

        // Add some random horizontal movement on bounce
        velocityRef.current.x += (Math.random() - 0.5) * 2
      }

      // Continue animation
      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [falling])

  return (
    <div
      ref={elementRef}
      className={cn("transition-all duration-300", falling && "will-change-transform", className)}
      style={{
        transform: falling
          ? `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`
          : "translate(0, 0) rotate(0deg)",
      }}
    >
      {children}
    </div>
  )
}


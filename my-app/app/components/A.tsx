"use client"

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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  
  const elementRef = useRef<HTMLDivElement>(null)
  const velocityRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef<number | null>(null)

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Hover detection
  useEffect(() => {
    if (!elementRef.current || !falling) return
    
    const rect = elementRef.current.getBoundingClientRect()
    const elementCenter = {
      x: rect.left + rect.width/2 + position.x,
      y: rect.top + rect.height/2 + position.y
    }
    
    const distance = Math.hypot(
      elementCenter.x - mousePos.x,
      elementCenter.y - mousePos.y
    )

    setIsHovered(distance < 100)
  }, [mousePos, position, falling])

  // Init physics
  useEffect(() => {
    if (enabled) {
      const timer = setTimeout(() => {
        setFalling(true)
        velocityRef.current = {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 0.5,
        }
        setRotation((Math.random() - 0.5) * 20)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [enabled, delay])

  // Animation loop
  useEffect(() => {
    if (!falling) return

    const gravity = 0.2
    const airResistance = 0.99
    const bounce = 0.7
    const mouseRepulsion = 0.3

    const animate = () => {
      if (!elementRef.current) return

      // Apply mouse repulsion
      if (isHovered) {
        const rect = elementRef.current.getBoundingClientRect()
        const elementCenter = {
          x: rect.left + rect.width/2 + position.x,
          y: rect.top + rect.height/2 + position.y
        }
        
        const dx = elementCenter.x - mousePos.x
        const dy = elementCenter.y - mousePos.y
        const distance = Math.hypot(dx, dy)
        
        if (distance < 100) {
          const force = (100 - distance) * mouseRepulsion
          velocityRef.current.x += (dx / distance) * force
          velocityRef.current.y += (dy / distance) * force
        }
      }

      // Apply physics
      velocityRef.current.y += gravity
      velocityRef.current.x *= airResistance
      velocityRef.current.y *= airResistance

      setPosition(prev => ({
        x: prev.x + velocityRef.current.x,
        y: prev.y + velocityRef.current.y
      }))

      setRotation(prev => prev + velocityRef.current.x * 2)

      // Boundary checks
      const rect = elementRef.current.getBoundingClientRect()
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      // Bottom collision
      if (rect.bottom + position.y > windowHeight) {
        velocityRef.current.y = -velocityRef.current.y * bounce
        setPosition(prev => ({
          x: prev.x,
          y: prev.y - (rect.bottom + prev.y - windowHeight)
        }))
      }

      // Side collisions
      if (rect.right + position.x > windowWidth || rect.left + position.x < 0) {
        velocityRef.current.x = -velocityRef.current.x * bounce
        setPosition(prev => ({
          x: prev.x - (rect.right + prev.x - windowWidth),
          y: prev.y
        }))
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [falling, isHovered])

  return (
    <div
      ref={elementRef}
      className={cn(
        "transition-transform duration-300",
        falling && "will-change-transform",
        isHovered && "cursor-grab active:cursor-grabbing",
        className
      )}
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
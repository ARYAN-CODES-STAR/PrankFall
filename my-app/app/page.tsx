"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { GravitatableElement } from "./components/A"
import Image from "next/image"
import { ArrowDown, Info, MessageSquare, Settings, User } from "lucide-react"

export default function Home() {
  const [gravityEnabled, setGravityEnabled] = useState(false)
  // Removed unused blackHolePos state

  useEffect(() => {
    const timer = setTimeout(() => {
      setGravityEnabled(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!gravityEnabled) return

    // Auto-scroll prank
    const handleClick = () => {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 2000)
    }

    // Black hole effect
    const createBlackHole = (e: MouseEvent) => {
      const hole = document.getElementById('black-hole')
      if (hole) {
        hole.style.left = `${e.clientX - 14}px`
        hole.style.top = `${e.clientY - 14}px`
        hole.classList.remove('hidden')
        setTimeout(() => hole.classList.add('hidden'), 500)
      }
    }

    window.addEventListener('click', handleClick)
    window.addEventListener('mousemove', createBlackHole)
    
    return () => {
      window.removeEventListener('click', handleClick)
      window.removeEventListener('mousemove', createBlackHole)
    }
  }, [gravityEnabled])

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative overflow-x-hidden">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <GravitatableElement enabled={gravityEnabled} delay={0} className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <ArrowDown className="text-white h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold">QuantumFlux UI</h1>
          </GravitatableElement>

          <GravitatableElement enabled={gravityEnabled} delay={200} className="flex gap-4">
            <Button variant="ghost">Documentation</Button>
            <Button variant="ghost">Examples</Button>
            <Button variant="ghost">GitHub</Button>
            <Button>Try Demo</Button>
          </GravitatableElement>
        </header>

        <section className="flex flex-col md:flex-row gap-8 mb-16">
          <GravitatableElement enabled={gravityEnabled} delay={500} className="flex-1">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">Defy Conventional UI Physics</h2>
              <p className="text-lg text-gray-600">
                Harness quantum entanglement and gravitational dynamics in your web applications.
                Finally, a framework that understands what goes up must come down!
              </p>
              <div className="flex gap-4">
                <Button size="lg">Start Experiment</Button>
                <Button size="lg" variant="outline">
                  Research Paper
                </Button>
              </div>
            </div>
          </GravitatableElement>

          <GravitatableElement enabled={gravityEnabled} delay={800} className="flex-1">
            <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Quantum field illustration"
                fill
                className="object-cover"
              />
            </div>
          </GravitatableElement>
        </section>

        <section className="mb-16">
          <GravitatableElement enabled={gravityEnabled} delay={1000} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Quantum-Powered Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience web development like never before with our physics-driven architecture.
            </p>
          </GravitatableElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Info className="h-8 w-8" />,
                title: "Entanglement States",
                description: "Components that maintain quantum coherence across renders",
                delay: 1200,
              },
              {
                icon: <Settings className="h-8 w-8" />,
                title: "Gravity Well API",
                description: "Programmatic control over UI element mass and charge",
                delay: 1400,
              },
              {
                icon: <MessageSquare className="h-8 w-8" />,
                title: "24/7 Superposition Support",
                description: "Our team exists in multiple states simultaneously",
                delay: 1600,
              },
            ].map((feature, index) => (
              <GravitatableElement key={index} enabled={gravityEnabled} delay={feature.delay}>
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 bg-primary/10 rounded-full text-primary">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </Card>
              </GravitatableElement>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <GravitatableElement enabled={gravityEnabled} delay={1800} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Scientist Testimonials</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Peer-reviewed acclaim from leading quantum interface researchers
            </p>
          </GravitatableElement>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Dr. Ellen O'Conner",
                role: "Quantum UX Researcher",
                quote: "Finally bridges the gap between quantum physics and responsive design. The observer effect has never been this beautiful!",
                delay: 2000,
              },
              {
                name: "Prof. Carlos Wu",
                role: "Particle Interface Engineer",
                quote: "We've achieved UI velocities previously thought impossible. Our conversion rates reached 99% light speed!",
                delay: 2200,
              },
            ].map((testimonial, index) => (
              <GravitatableElement key={index} enabled={gravityEnabled} delay={testimonial.delay}>
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col">
                    <p className="text-gray-600 italic mb-4">{testimonial.quote}</p>
                    <div className="flex items-center mt-auto">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <User className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </GravitatableElement>
            ))}
          </div>
        </section>

        <GravitatableElement enabled={gravityEnabled} delay={2400}>
          <Card className="p-8 bg-primary text-primary-foreground text-center hover:shadow-xl transition-shadow">
            <h2 className="text-3xl font-bold mb-4">Ready for Quantum Development?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Join thousands of developers bending spacetime with their UIs
            </p>
            <Button size="lg" variant="secondary" className="animate-pulse">
              Start Free Trial
            </Button>
          </Card>
        </GravitatableElement>
      </div>
    </main>
  )
}
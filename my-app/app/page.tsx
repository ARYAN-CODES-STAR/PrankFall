"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { GravitatableElement } from "./components/A"
import Image from "next/image"
import { ArrowDown, Info, MessageSquare, Settings, User } from "lucide-react"

export default function Home() {
  const [gravityEnabled, setGravityEnabled] = useState(false)

  useEffect(() => {
    // Wait a few seconds before enabling gravity for surprise effect
    const timer = setTimeout(() => {
      setGravityEnabled(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <GravitatableElement enabled={gravityEnabled} delay={0} className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <ArrowDown className="text-white h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold">Gravity Demo</h1>
          </GravitatableElement>

          <GravitatableElement enabled={gravityEnabled} delay={200} className="flex gap-4">
            <Button variant="ghost">About</Button>
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">Pricing</Button>
            <Button variant="ghost">Contact</Button>
            <Button>Sign Up</Button>
          </GravitatableElement>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row gap-8 mb-16">
          <GravitatableElement enabled={gravityEnabled} delay={500} className="flex-1">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">Discover the power of gravity</h2>
              <p className="text-lg text-gray-600">
                Our innovative platform helps you understand how things fall into place. Perfect for businesses looking
                to ground their ideas.
              </p>
              <div className="flex gap-4">
                <Button size="lg">Get Started</Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </GravitatableElement>

          <GravitatableElement enabled={gravityEnabled} delay={800} className="flex-1">
            <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Gravity illustration"
                fill
                className="object-cover"
              />
            </div>
          </GravitatableElement>
        </section>

        {/* Features */}
        <section className="mb-16">
          <GravitatableElement enabled={gravityEnabled} delay={1000} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Amazing Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform offers everything you need to make your projects successful.
            </p>
          </GravitatableElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Info className="h-8 w-8" />,
                title: "Insightful Analytics",
                description: "Track how your elements fall with detailed metrics and reports.",
                delay: 1200,
              },
              {
                icon: <Settings className="h-8 w-8" />,
                title: "Customizable Controls",
                description: "Adjust the gravity settings to match your specific needs.",
                delay: 1400,
              },
              {
                icon: <MessageSquare className="h-8 w-8" />,
                title: "24/7 Support",
                description: "Our team is always ready to help you when things are falling apart.",
                delay: 1600,
              },
            ].map((feature, index) => (
              <GravitatableElement key={index} enabled={gravityEnabled} delay={feature.delay}>
                <Card className="p-6 h-full">
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

        {/* Testimonials */}
        <section className="mb-16">
          <GravitatableElement enabled={gravityEnabled} delay={1800} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Heres what people are saying about our gravity-defying platform.
            </p>
          </GravitatableElement>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Product Manager",
                quote:
                  "This platform completely changed how we approach our projects. Everything just falls into place now!",
                delay: 2000,
              },
              {
                name: "Sarah Williams",
                role: "UX Designer",
                quote:
                  "I was skeptical at first, but now I can't imagine working without it. The gravity effect is mind-blowing!",
                delay: 2200,
              },
            ].map((testimonial, index) => (
              <GravitatableElement key={index} enabled={gravityEnabled} delay={testimonial.delay}>
                <Card className="p-6">
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

        {/* CTA */}
        <GravitatableElement enabled={gravityEnabled} delay={2400}>
          <Card className="p-8 bg-primary text-primary-foreground text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to experience gravity?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied users who have already fallen for our platform.
            </p>
            <Button size="lg" variant="secondary">
              Get Started For Free
            </Button>
          </Card>
        </GravitatableElement>
      </div>
    </main>
  )
}


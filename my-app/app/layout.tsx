import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "QuantumFlux UI 2.0",
  description: "Experience the world's first quantum-entangled interface framework. Warning: May cause gravitational anomalies in classical computing environments!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="black-hole" className="absolute hidden w-8 h-8 bg-purple-500/30 rounded-full blur-xl" />
        {children}
      </body>
    </html>
  )
}
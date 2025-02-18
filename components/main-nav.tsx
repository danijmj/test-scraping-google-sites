"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCallback } from "react"
import { Brain } from "lucide-react"

export function MainNav() {
  const handleContactClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const contactForm = document.getElementById("contact-form")
    if (contactForm) {
      setTimeout(() => {
        contactForm.scrollIntoView({ behavior: "smooth" })
      }, 100) // 100ms delay
    }
  }, [])
  return (
    <header className="border-b">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            {/* <Brain className="h-8 w-8 text-primary" /> */}
            <div className="h-8 w-8 text-primary" > <img src="/noBgColor.ico.256.png" alt="PriceSense AI"/></div>
            <span className="text-xl font-bold">PriceSense AI</span>
          </Link>
        </div>
        <nav className="hidden space-x-8 md:flex">
          {/* <Link href="/products" className="text-gray-700 hover:text-primary">
            Products
          </Link>
          <Link href="/solutions" className="text-gray-700 hover:text-primary">
            Solutions
          </Link>
          <Link href="/customers" className="text-gray-700 hover:text-primary">
            Customers
          </Link>
          <Link href="/partners" className="text-gray-700 hover:text-primary">
            Partners
          </Link>
          <Link href="/learn" className="text-gray-700 hover:text-primary">
            Learn
          </Link>
          <Link href="/company" className="text-gray-700 hover:text-primary">
            Company
          </Link> */}
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="#contact" className="text-gray-700 hover:text-primary">
            Contact Us
          </Link>
          {/* <Button>Try Demo</Button> */}
          <Button onClick={handleContactClick}>Contact Us</Button>
        </div>
      </div>
    </header>
  )
}


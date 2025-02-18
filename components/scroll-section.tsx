"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const sections = [
  {
    id: "prevent",
    title: "Prevent Data Breaches",
    description: "Safeguard sensitive data across the enterprise with award-winning control and visibility.",
    features: [
      "Manage policies and investigate and remediate incidents from one console.",
      "Automatically adapt policies based on risky user behavior in real time.",
      "Configure and deploy policies from the cloud in minutes.",
    ],
    buttonText: "Find Out How",
    image: "https://images.unsplash.com/photo-1728563319004-43c44be7a47a", 
    // // We'll use a local image for better reliability
  },
  {
    id: "unify",
    title: "Unify Policy Coverage",
    description: "Enable people to work anywhere, with data everywhere, safely.",
    features: [
      "Enforce a single set of policies in the cloud, web, endpoint, email and network.",
      "Secure access for 800,000+ public cloud applications from any device.",
      "Scale coverage globally with 300+ PoPs and 99.99% uptime from AWS.",
    ],
    buttonText: "Learn More",
    image: "https://images.unsplash.com/photo-1647706155273-635630093fbc", 
    // We'll use a local image for better reliability
  },
  {
    id: "simplify",
    title: "Simplify Compliance",
    description: "Streamline compliance for regulations with the largest collection of policy templates.",
    features: [
      "Enforce compliance with 1,700+ classifiers and pre-built policies.",
      "Discover and classify structured and unstructured data using AI.",
      "Unify incident investigation, analysis and reporting.",
    ],
    buttonText: "Start Today",
    image: "https://images.unsplash.com/photo-1441825204192-c69e659bca4e",
   // We'll use a local image for better reliability
  },
]

export function ScrollSection() {
  const [activeSection, setActiveSection] = useState("prevent")
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    const observers = sections.map((section) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            console.log('Element is in view!');
            setActiveSection(section.id)
          }
        },
        {
          root: null, // Use the viewport as the container
          rootMargin: '0px',
          threshold: 0.5, // Trigger when 10% of the element is in view
        }
      )

      if (sectionRefs.current[section.id]) {
        observer.observe(sectionRefs.current[section.id]!)
      }

      return observer
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <section className="relative bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Scrolling content */}
          <div className="px-4 py-16 sm:px-6 lg:px-8">
            {sections.map((section) => (
              <div key={section.id} ref={(el) => (sectionRefs.current[section.id] = el)} className="min-h-[80vh] py-16">
                <div className="sticky top-1/3">
                  <h2 className="text-3xl font-bold tracking-tight text-[#1a2b3c] sm:text-4xl mb-4">{section.title}</h2>
                  <p className="text-lg text-gray-600 mb-8">{section.description}</p>
                  <ul className="space-y-6 mb-8">
                    {section.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-primary mt-1" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    {section.buttonText} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky image container */}
          <div className="hidden lg:block">
            <div className="sticky top-0 h-screen flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.05 }}
                  className="relative w-[90%] h-[600px] rounded-lg overflow-hidden shadow-xl bg-white"
                >
                  <Image
                    src={sections.find((s) => s.id === activeSection)?.image || "/placeholder.svg"}
                    alt={`Illustration for ${activeSection}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


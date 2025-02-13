"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Calculator,
  BarChart2,
  MessageSquareHeart,
  Scale,
  ClipboardCheck,
  BuildingIcon as Buildings,
  ChevronRight,
} from "lucide-react"

const tools = [
  {
    id: "calculator",
    icon: Calculator,
    title: "Price AI Calculator",
    description:
      "Leverage machine learning to accurately predict and optimize pricing strategies for your products. Our AI calculator analyzes market trends, competitor data, and customer behavior to suggest optimal price points.",
  },
  {
    id: "analytics",
    icon: BarChart2,
    title: "Price Analytics",
    description:
      "Get deep insights into your pricing performance with advanced analytics. Track price elasticity, market positioning, and revenue impact in real-time with our comprehensive analytics dashboard.",
  },
  {
    id: "sentiment",
    icon: MessageSquareHeart,
    title: "Sentimental Review Analytics",
    description:
      "Understand customer sentiment at scale. Our AI-powered tool analyzes customer reviews and feedback to provide actionable insights about product perception and customer satisfaction.",
  },
  {
    id: "competence",
    icon: Scale,
    title: "Competence Comparison",
    description:
      "Compare your hotel's performance against competitors in real-time. Analyze pricing strategies, amenities, customer satisfaction scores, and market positioning to stay ahead of the competition.",
  },
  {
    id: "review",
    icon: ClipboardCheck,
    title: "Review Management",
    description:
      "Streamline your review management process with AI-powered tools. Automatically categorize feedback, identify trends, and generate response templates while maintaining a personal touch.",
  },
  {
    id: "multihotel",
    icon: Buildings,
    title: "Multi Hotel Analysis",
    description:
      "Get a comprehensive view of your hotel portfolio's performance. Compare metrics across properties, identify best practices, and optimize operations with our advanced multi-property analytics platform.",
  },
]

export function AIToolsSection() {
  const [activeTool, setActiveTool] = useState(tools[0].id)
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)

  return (
    <section className="bg-gradient-to-br from-gray-100 to-gray-200 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-16">
          AI-Powered Tools for Smarter Business
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left side - Tool selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {tools.map((tool) => {
              const Icon = tool.icon
              const isActive = tool.id === activeTool
              const isHovered = tool.id === hoveredTool
              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  onMouseEnter={() => setHoveredTool(tool.id)}
                  onMouseLeave={() => setHoveredTool(null)}
                  className={`w-full flex items-center space-x-4 p-4 sm:p-6 rounded-xl transition-all duration-200 ${
                    isActive ? "bg-white shadow-lg" : "hover:bg-white hover:shadow-md"
                  }`}
                >
                  <motion.div
                    className={`p-3 rounded-lg ${isActive ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}
                    animate={{
                      rotate: isHovered ? 360 : 0,
                      scale: isHovered ? 1.1 : 1,
                    }}
                    transition={{
                      rotate: { duration: 0.5 },
                      scale: { duration: 0.2 },
                    }}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <span
                    className={`text-lg sm:text-xl text-left ${isActive ? "text-gray-900 font-medium" : "text-gray-600"}`}
                  >
                    {tool.title}
                  </span>
                  <motion.div
                    className={`ml-auto ${isActive || isHovered ? "opacity-100" : "opacity-0"}`}
                    animate={{ x: isActive || isHovered ? 0 : -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="h-5 w-5 text-primary" />
                  </motion.div>
                </button>
              )
            })}
          </div>

          {/* Right side - Content display */}
          <div className="mt-8 lg:mt-0 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTool}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                {tools.map((tool) => {
                  const Icon = tool.icon
                  if (tool.id !== activeTool) return null
                  return (
                    <div key={tool.id}>
                      <motion.div
                        className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="h-8 w-8 text-primary" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{tool.title}</h3>
                      <p className="text-gray-600 mb-6">{tool.description}</p>
                      <Button className="bg-primary hover:bg-primary/90">Learn More</Button>
                    </div>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}


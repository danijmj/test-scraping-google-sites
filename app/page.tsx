"use client"
import { ScrollSection } from "@/components/scroll-section"
import { AIToolsSection } from "@/components/ai-tools-section"
import { PricingSection } from "@/components/pricing-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { PauseIcon, PlayIcon } from "lucide-react"
import { useRef, useState } from "react"
import { TypewriterEffect } from "@/components/typewriter-effect"

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <main>
      <section className="relative h-screen overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 min-w-full min-h-full object-cover z-0"
        >
          <source
            src="https://videos.pexels.com/video-files/5874390/5874390-uhd_2732_1440_30fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        <div className="relative z-20 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 flex items-center h-full">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl sm:leading-[1.1em] leading-[1.1em]">
              Uncover Competitor Pricing, Understand Your Guests,&nbsp;
              <span className="bg-primary text-white">
                &nbsp;
                <TypewriterEffect text="Powered by AI" />
              </span>
            </h1>
            <p className="mt-6 text-xl">
              Our GenAI engine analyse customer feedback and competitor prices, delivers all what you need to improve
              your operations
            </p>
            <ul className="mt-8 space-y-4 text-lg">
              <li>• Prize AI Analysis.</li>
              <li>• Reviews sentiment Analysis.</li>
            </ul>
            <button
              onClick={toggleVideo}
              className="absolute bottom-4 right-4 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition-colors duration-200"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </section>
      {/* <ClientLogos /> */}
      <ScrollSection />
      <AIToolsSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </main>
  )
}


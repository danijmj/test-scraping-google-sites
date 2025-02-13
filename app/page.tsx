import { Button } from "@/components/ui/button"
import { ClientLogos } from "@/components/client-logos"
import { ScrollSection } from "@/components/scroll-section"
import { AIToolsSection } from "@/components/ai-tools-section"
import { PricingSection } from "@/components/pricing-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <main>
      <section className="relative h-screen overflow-hidden">
        <video autoPlay loop muted className="absolute top-0 left-0 min-w-full min-h-full object-cover z-0">
          <source
            src="https://videos.pexels.com/video-files/5874390/5874390-uhd_2732_1440_30fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        <div className="relative z-20 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 flex items-center h-full">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              The path to AI begins with <span className="text-primary-foreground">data confidence</span>
            </h1>
            <p className="mt-6 text-xl">Get clean, accessible, and governed AI-ready data in weeks, not months.</p>
            <ul className="mt-8 space-y-4 text-lg">
              <li>• Trusted by Fortune 100 enterprises.</li>
              <li>• Powered by a Knowledge Graph.</li>
              <li>• SOC 2 Type II and ISO/IEC 27001 certified.</li>
            </ul>
            <div className="mt-10 flex gap-4">
              <Button size="lg" variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Take Product Tour <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20">
                Join Live Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
      <ClientLogos />
      <ScrollSection />
      <AIToolsSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </main>
  )
}


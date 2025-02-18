"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function ContactSection() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isEmailValid, setIsEmailValid] = useState(true)

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "email") {
      setIsEmailValid(validateEmail(value))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isEmailValid) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid email address.",
      })
      return
    }
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Message sent",
          description: "Your message has been sent successfully. We will contact you soon.",
        })
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occurred while sending the message. Please try again later.",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while sending the message. Please try again later.",
      })
    }
  }

  return (
    <section id="contact-form" className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[#1a2b3c] sm:text-4xl mb-6">Get in touch</h2>
            <p className="text-lg text-gray-600 mb-8">
              We'd love to hear from you. Please fill out this form or reach out to us using the contact information
              below.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-6 w-6 text-primary" />
                <span>info@optiml-solutions.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-6 w-6 text-primary" />
                <a href="tel:+4917680592510">+49 17680592510</a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-6 w-6 text-primary" />
                <span>Kirchheim Str. Germany</span>
              </div>
            </div>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              placeholder="Your name"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              placeholder="Your email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={!isEmailValid ? "border-red-500" : ""}
            />
            {!isEmailValid && <p className="text-red-500 text-sm">Please enter a valid email address</p>}
            <Input
              placeholder="Subject"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <Textarea
              placeholder="Your message"
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
            />
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}


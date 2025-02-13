import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const tiers = [
  {
    name: "Starter",
    price: "$99",
    description: "Perfect for small teams just getting started with AI.",
    features: ["Up to 5 users", "10,000 API calls per month", "Basic analytics", "Email support"],
  },
  {
    name: "Pro",
    price: "$299",
    description: "Ideal for growing businesses with advanced AI needs.",
    features: [
      "Up to 20 users",
      "100,000 API calls per month",
      "Advanced analytics",
      "Priority support",
      "Custom model training",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with specific requirements.",
    features: [
      "Unlimited users",
      "Unlimited API calls",
      "Full analytics suite",
      "Dedicated support team",
      "On-premise deployment option",
      "Custom integrations",
    ],
  },
]

export function PricingSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-center text-[#1a2b3c] sm:text-4xl mb-12">
          Pricing Plans
        </h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div key={tier.name} className="flex flex-col justify-between p-8 bg-gray-50 rounded-lg shadow-lg">
              <div>
                <h3 className="text-2xl font-semibold text-[#1a2b3c] mb-4">{tier.name}</h3>
                <p className="text-4xl font-bold mb-6">{tier.price}</p>
                <p className="text-gray-600 mb-6">{tier.description}</p>
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button className="w-full">{tier.name === "Enterprise" ? "Contact Sales" : "Get Started"}</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


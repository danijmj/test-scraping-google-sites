import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain } from "lucide-react"

export function MainNav() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">OptiML Solutions</span>
          </Link>
        </div>
        <nav className="hidden space-x-8 md:flex">
          <Link href="/products" className="text-gray-700 hover:text-primary">
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
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/contact" className="text-gray-700 hover:text-primary">
            Contact Us
          </Link>
          <Button>Try Demo</Button>
        </div>
      </div>
    </header>
  )
}


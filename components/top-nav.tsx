import Link from "next/link"

export function TopNav() {
  return (
    <div className="bg-gray-900 text-primary-foreground">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div>OptiML Solutions</div>
        <nav className="flex space-x-4 text-sm">
          <Link target="_blank" href="https://www.optiml-solutions.com">inicio</Link>
          <Link target="_blank" href="https://www.optiml-solutions.com/about">about</Link>
          <Link target="_blank" href="https://www.optiml-solutions.com/specialities">Our Offering</Link>
        </nav>
      </div>
    </div>
  )
}


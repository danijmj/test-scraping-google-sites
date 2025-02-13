import Link from "next/link"

export function TopNav() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div>OptiML Software</div>
        <nav className="flex space-x-4 text-sm">
          <Link href="/support">Support</Link>
          <Link href="/community">Community</Link>
          <Link href="/downloads">Downloads</Link>
          <Link href="/documentation">Documentation</Link>
          <Link href="/login">Login</Link>
        </nav>
      </div>
    </div>
  )
}


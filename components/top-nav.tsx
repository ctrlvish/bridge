import Link from 'next/link'
import { User } from 'lucide-react'

export default function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
        <Link href="/feed" className="text-lg font-semibold tracking-normal text-foreground">
          bridge
        </Link>

        <Link
          href="/settings"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground"
          aria-label="Open settings"
        >
          <User className="h-4 w-4" />
        </Link>
      </div>
    </header>
  )
}

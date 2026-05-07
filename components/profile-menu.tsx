'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, Settings, User } from 'lucide-react'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface ProfileMenuProps {
  username: string
  displayName: string
  avatarUrl: string | null
}

export default function ProfileMenu({
  username,
  displayName,
  avatarUrl,
}: ProfileMenuProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  async function handleLogOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    setOpen(false)
    router.replace('/login')
    router.refresh()
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border bg-card text-foreground"
        aria-label="Open profile menu"
        aria-expanded={open}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            className="h-full w-full object-cover"
          />
        ) : (
          <User className="h-4 w-4" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <Link
            href={`/profile/${username}`}
            className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted"
            onClick={() => setOpen(false)}
          >
            <User className="h-4 w-4" />
            My profile
          </Link>

          <Link
            href="/settings"
            className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted"
            onClick={() => setOpen(false)}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>

          <button
            type="button"
            onClick={handleLogOut}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-foreground hover:bg-muted"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      )}
    </div>
  )
}

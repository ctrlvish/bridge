import Link from 'next/link'
import { User } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export default async function TopNav() {

  const supabase = await createClient()
  const { data: authData } = await supabase.auth.getUser()

  let profile = null

  if (authData.user) {
    const { data } = await supabase
      .from('users')
      .select('username, display_name, avatar_url')
      .eq('id', authData.user.id)
      .single()

    profile = data
  }


  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
        <Link href="/feed" className="text-lg font-semibold text-foreground">
          bridge
        </Link>

        {profile ? (
          <Link
            href="/settings"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground"
            aria-label="Open settings"
          >
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.display_name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <User className="h-4 w-4" />
            )}
          </Link>
        ) : (
          <Link href="/login" className="text-sm font-medium text-primary">
            Log in
          </Link>
        )}
      </div>
    </header>
)
}

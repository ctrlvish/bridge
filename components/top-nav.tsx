import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import ProfileMenu from '@/components/profile-menu'


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
          <ProfileMenu
            username={profile.username}
            displayName={profile.display_name}
            avatarUrl={profile.avatar_url}
          />
        ) : (
          <Link href="/login" className="text-sm font-medium text-primary">
            Log in
          </Link>
        )}
      </div>
    </header>
)
}

import Link from "next/link";
import { User } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import BackButton from "@/components/back-button";
import ProfileSettingsForm from "@/components/profile-settings-form";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-7.5rem)] max-w-lg flex-col items-center justify-center px-4 text-center">
        <h1 className="text-lg font-semibold text-foreground">
          Log in to edit your profile
        </h1>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Your profile settings are tied to your Bridge account.
        </p>
        <Link
          href="/login"
          className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Log in
        </Link>
      </main>
    );
  }

  const { data: profile } = await supabase
    .from("users")
    .select("id, username, display_name, bio, avatar_url")
    .eq("id", authData.user.id)
    .single();

  if (!profile) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-7.5rem)] max-w-lg flex-col items-center justify-center px-4 text-center">
        <h1 className="text-lg font-semibold text-foreground">
          Profile not found
        </h1>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Try signing out and signing in again.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-5">
      <BackButton />

      <section className="border-b border-border pb-5">
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your Bridge profile.
        </p>
      </section>

      <section className="py-5">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-muted text-foreground">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.display_name}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-5 w-5" />
            )}
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold text-foreground">
              Edit profile
            </h2>
            <p className="truncate text-sm text-muted-foreground">
              @{profile.username}
            </p>
          </div>
        </div>

        <ProfileSettingsForm
          userId={profile.id}
          initialUsername={profile.username}
          initialDisplayName={profile.display_name}
          initialBio={profile.bio}
        />
      </section>
    </main>
  );
}

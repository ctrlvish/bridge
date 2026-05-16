import { User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BackButton from "@/components/back-button";
import PostCard from "@/components/post-card";

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function ProfilePage(props: ProfilePageProps) {
  const { username } = await props.params;
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  const { data: profile, error } = await supabase
    .from("users")
    .select("id, username, display_name, bio, avatar_url, created_at")
    .eq("username", username)
    .single();

  if (error || !profile) {
    notFound();
  }

  const [
    { count: postCount },
    { count: followerCount },
    { count: followingCount },
    { data: posts },
  ] = await Promise.all([
    supabase
      .from("posts")
      .select("id", { count: "exact", head: true })
      .eq("user_id", profile.id),
    supabase
      .from("follows")
      .select("follower_id", { count: "exact", head: true })
      .eq("following_id", profile.id),
    supabase
      .from("follows")
      .select("following_id", { count: "exact", head: true })
      .eq("follower_id", profile.id),
    supabase
      .from("posts")
      .select("id, title, body, spotify_url, created_at")
      .eq("user_id", profile.id)
      .order("created_at", { ascending: false }),
  ]);

  const joinedAt = new Date(profile.created_at).toLocaleDateString("en-AU", {
    month: "long",
    year: "numeric",
  });
  const isOwnProfile = authData.user?.id === profile.id;

  return (
    <main className="mx-auto max-w-lg px-4 py-5">
      <BackButton />

      <section className="border-b border-border pb-6">
        <div className="flex items-start gap-4">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-foreground">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.display_name}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-8 w-8" />
            )}
          </span>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-2xl font-semibold leading-tight text-foreground">
              {profile.display_name}
            </h1>
            <p className="mt-1 truncate text-sm text-muted-foreground">
              @{profile.username}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Joined {joinedAt}
            </p>
          </div>

          {isOwnProfile && (
            <Link
              href="/settings"
              className="shrink-0 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Edit
            </Link>
          )}
        </div>

        {profile.bio && (
          <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-foreground">
            {profile.bio}
          </p>
        )}

        <div className="mt-5 grid grid-cols-3 rounded-xl border border-border bg-card px-3 py-3 text-center">
          <div>
            <p className="text-base font-semibold text-foreground">
              {postCount ?? 0}
            </p>
            <p className="text-xs text-muted-foreground">Posts</p>
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">
              {followerCount ?? 0}
            </p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">
              {followingCount ?? 0}
            </p>
            <p className="text-xs text-muted-foreground">Following</p>
          </div>
        </div>
      </section>

      <section className="py-5">
        <h2 className="mb-3 text-base font-semibold text-foreground">Posts</h2>

        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              spotifyUrl={post.spotify_url}
              createdAt={post.created_at}
              displayName={profile.display_name}
              username={profile.username}
              avatarUrl={profile.avatar_url}
              source="profile"
            />
          ))
        ) : (
          <div className="rounded-xl border border-border bg-card px-4 py-6 text-center text-sm text-muted-foreground">
            No posts yet.
          </div>
        )}
      </section>
    </main>
  );
}

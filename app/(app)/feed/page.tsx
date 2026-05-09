import { createClient } from "@/lib/supabase/server";
import PostCard from "@/components/post-card";
import { User } from "lucide-react";

export default async function Feed() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("posts").select(`*,
            users!posts_user_id_fkey(
            display_name,
            avatar_url
            )
        `);
  console.log("data:", data);
  console.log("error:", error);

  if (!data) return <p>No posts</p>;
  return (
    <div className="max-w-lg mx-auto px-4 py-4">
      <button className="mb-4 flex w-full items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-left text-sm text-muted-foreground">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground">
          <User className="h-4 w-4" />
        </span>
        <span>What song&apos;s on your mind?</span>
      </button>

      {data.map((post) => {
        return (
          <PostCard
            key={post.id}
            title={post.title}
            body={post.body}
            spotifyUrl={post.spotify_url}
            createdAt={post.created_at}
            displayName={post.users.display_name}
            avatarUrl={post.users.avatar_url}
          ></PostCard>
        );
      })}
    </div>
  );
}

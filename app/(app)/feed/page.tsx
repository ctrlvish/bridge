import { createClient } from "@/lib/supabase/server";
import PostCard from "@/components/post-card";
import CreatePostForm from "@/components/create-post-form";

export default async function Feed() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  const { data, error } = await supabase.from("posts").select(`*,
            users!posts_user_id_fkey(
            display_name,
            avatar_url
            )
        `).order("created_at", { ascending: false });
  console.log("data:", data);
  console.log("error:", error);

  if (!data) return <p>No posts</p>;
  return (
    <div className="max-w-lg mx-auto px-4 py-4">
      <CreatePostForm isAuthenticated={Boolean(authData.user)} />

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

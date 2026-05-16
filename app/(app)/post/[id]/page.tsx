import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PostActions from "@/components/post-actions";
import SpotifyEmbed from "@/components/spotify-embed";

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    from?: string;
  }>;
}

export default async function PostPage(props: PostPageProps) {
  const { id } = await props.params;
  const searchParams = await props.searchParams;
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select(
      `*,
        users!posts_user_id_fkey(
          username,
          display_name,
          avatar_url,
          bio
        )
      `,
    )
    .eq("id", id)
    .single();

  if (error || !post) {
    notFound();
  }

  const publishedAt = new Date(post.created_at).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="mx-auto max-w-lg px-4 py-5">
      {searchParams.from === "feed" && (
        <Link
          href="/feed"
          className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to feed</span>
        </Link>
      )}

      <article className="border-b border-border pb-6">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-muted text-foreground">
            {post.users.avatar_url ? (
              <img
                src={post.users.avatar_url}
                alt={post.users.display_name}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-5 w-5" />
            )}
          </span>

          <div className="min-w-0">
            <Link
              href={`/profile/${post.users.username}`}
              className="block truncate font-medium text-foreground hover:underline"
            >
              {post.users.display_name}
            </Link>
            <p className="truncate">
              @{post.users.username} · {publishedAt}
            </p>
          </div>
        </div>

        <h1 className="mt-5 text-3xl font-semibold leading-tight text-foreground">
          {post.title}
        </h1>

        {post.spotify_url && (
          <div className="mt-5">
            <SpotifyEmbed spotifyUrl={post.spotify_url} height="152" />
          </div>
        )}

        <div className="mt-5 whitespace-pre-wrap text-base leading-8 text-foreground">
          {post.body}
        </div>

        <PostActions postId={post.id} bordered />
      </article>

      <section className="py-6">
        <h2 className="text-base font-semibold text-foreground">Comments</h2>
        <div className="mt-3 rounded-xl border border-border bg-card px-4 py-5 text-sm text-muted-foreground">
          Comments are coming soon.
        </div>
      </section>
    </main>
  );
}

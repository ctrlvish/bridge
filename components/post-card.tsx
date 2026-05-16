import Link from "next/link";
import { User } from "lucide-react";
import PostActions from "@/components/post-actions";
import SpotifyEmbed from "@/components/spotify-embed";

interface PostCardProps {
  id: string;
  body: string;
  createdAt: string;
  title: string;
  displayName: string;
  username: string;
  avatarUrl: string | null;
  spotifyUrl: string | null;
}

export default function PostCard(props: PostCardProps) {
  const {
    id,
    body,
    createdAt,
    title,
    displayName,
    username,
    avatarUrl,
    spotifyUrl,
  } = props;

  const time = new Date(createdAt).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
  });

  return (
    <article className="relative mb-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
      <Link
        href={`/post/${id}`}
        className="absolute inset-0 rounded-2xl"
        aria-label={`Open ${title}`}
      />

      {/* header */}
      <div className="pointer-events-none relative z-10 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-muted text-foreground">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-4 w-4" />
            )}
          </span>
          <Link
            href={`/profile/${username}`}
            className="pointer-events-auto font-medium text-foreground hover:underline"
          >
            {displayName}
          </Link>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">{time}</span>
        </div>
      </div>

      {/* content */}
      <h2 className="pointer-events-none relative z-10 mt-3 text-lg font-semibold leading-snug text-foreground">
        {title}
      </h2>
      <p className="pointer-events-none relative z-10 mt-1 text-sm leading-relaxed text-foreground">
        {body}
      </p>

      {/* spotify */}
      {spotifyUrl && (
        <div className="relative z-10 mt-1">
          <SpotifyEmbed spotifyUrl={spotifyUrl} />
        </div>
      )}

      {/* actions */}
      <PostActions postId={id} />
    </article>
  );
}

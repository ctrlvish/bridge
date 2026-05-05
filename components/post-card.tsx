import { Heart, MessageCircle, User } from "lucide-react"

interface PostCardProps {
  body: string
  createdAt: string
  title: string
  displayName: string
  avatarUrl: string | null
  spotifyUrl: string | null
}

export default function PostCard(props: PostCardProps) {
  const {
    body,
    createdAt,
    title,
    displayName,
    avatarUrl,
    spotifyUrl,
  } = props

  const hours = Math.floor(
    (Date.now() - new Date(createdAt).getTime()) / 3600000
  )

  const time =
    hours < 1 ? "just now" : hours < 24 ? `${hours}h` : `${Math.floor(hours / 24)}d`

  const embedParts = spotifyUrl?.split('/')
  const embedType = embedParts?.[3]
  const embedId = embedParts?.[4]?.split('?')[0]

  return (
    <div className="bg-card p-5 rounded-2xl border border-border mb-3">
      
      {/* header */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
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
          <span className="text-foreground font-medium">{displayName}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">{time}</span>
        </div>
      </div>

      {/* content */}
      <h2 className="mt-3 text-lg font-semibold text-foreground leading-snug">{title}</h2>
      <p className="text-sm mt-1 text-muted-foreground leading-relaxed">{body}</p>

      {/* spotify */}
      {spotifyUrl && (
        <div className="mt-1 rounded-xl overflow-hidden">
          <iframe
          src={`https://open.spotify.com/embed/${embedType}/${embedId}`}
          width="100%"
          height="80"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          />
        </div>
      )}

      {/* actions */}
      <div className="flex items-center gap-5 mt-4 text-muted-foreground">
      <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
        <Heart className="w-4 h-4" />
        <span className="text-xs">0</span>
      </button>
      <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
        <MessageCircle className="w-4 h-4" />
        <span className="text-xs">0</span>
      </button>
      </div>
      </div>
  )
}

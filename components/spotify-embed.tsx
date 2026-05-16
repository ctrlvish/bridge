interface SpotifyEmbedProps {
  spotifyUrl: string | null;
  height?: string;
}

export default function SpotifyEmbed(props: SpotifyEmbedProps) {
  const { spotifyUrl, height = "80" } = props;
  const embedParts = spotifyUrl?.split("/");
  const embedType = embedParts?.[3];
  const embedId = embedParts?.[4]?.split("?")[0];

  if (!embedType || !embedId) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-xl">
      <iframe
        src={`https://open.spotify.com/embed/${embedType}/${embedId}`}
        width="100%"
        height={height}
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}

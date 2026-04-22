interface PostCardProps {
  body: string
  createdAt: string
  musicArtworkUrl: string | null
  musicCreator: string
  musicTitle: string
  title: string
  displayName: string
  avatarUrl: string | null
}


export default function PostCard({body, createdAt, musicArtworkUrl, musicCreator, musicTitle, title, displayName, avatarUrl}: PostCardProps){


    const defaultAvatar = `https://api.dicebear.com/9.x/glass/svg?seed=${displayName}`

    return(
        <div className="flex flex-row">
            <div className="flex items-start">
                <img 
                    src={avatarUrl ?? defaultAvatar} alt={displayName} 
                    className="w-8 h-8 rounded-full object-cover"
                />
            </div>
            <div>
                <p>{displayName}</p>
                <p>{title}</p>
                <p>{body}</p>
                <p>{musicCreator}</p>
                <p>{musicTitle}</p>
                <p>{createdAt}</p>
            </div>
        </div>
    )
}
import { createClient } from '@/lib/supabase/server'
import PostCard from '@/components/post-card'


export default async function Feed(){

    const supabase = await createClient()

    const {data, error} = await supabase
        .from('posts')
        .select(`*,
            users!posts_user_id_fkey(
            display_name,
            avatar_url
            )
        `)
    console.log('data:', data)
    console.log('error:', error)

    if (!data) return <p>No posts</p>
    return (
        <>
        {data.map(post => {
            return(
                <PostCard
                    key = {post.id}
                    body = {post.body}
                    createdAt = {post.created_at}
                    musicArtworkUrl = {post.music_artwork_url} musicCreator = {post.music_creator} 
                    musicTitle = {post.music_title} 
                    title = {post.title} 
                    displayName = {post.users.display_name}
                    avatarUrl = {post.users.avatar_url}

                ></PostCard>
            )
        })}
        </>
    )
}
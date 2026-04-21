import { createClient } from '@/lib/supabase/server'

export default async function Feed(){

    const supabase = await createClient()

    const {data, error} = await supabase
        .from('posts')
        .select()
    console.log(data)
    return (<p>feed</p>)
}
'use client'
import {useState} from 'react'
import { createClient } from '@/lib/supabase/client'
import {useRouter} from 'next/navigation'
import Link from 'next/link'


export default function Login(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    async function handleSubmit(e:React.SubmitEvent<HTMLFormElement>){
        e.preventDefault()
        setSubmitted(true)
        const supabase = createClient()
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        if(error){
            setError(error.message)
        }
        if(data.user){
            router.push('/feed')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-sm flex flex-col gap-4">
                <form onSubmit={handleSubmit}>
                    <label htmlFor='email-input'>Email</label>
                    <input 
                        name='email-input' 
                        type='text' 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email}
                        className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground outline-none focus:ring-2 focus:ring-ring" >
                            
                    </input>

                    <label htmlFor='email-input'>Password</label>
                    <input 
                        name='password-input' 
                        type='password' 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password}
                        className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground outline-none focus:ring-2 focus:ring-ring" >
                    </input>

                    {error && <p className='text-destructive text-sm'>{error}</p>}
                    <button className="w-full bg-primary text-primary-foreground py-2 rounded-md text-sm mt-5 cursor-pointer">Sign in</button>
                </form>
                <Link href='/signup' className='text-primary underline'>Don't have an account? Sign up</Link>
            </div>
        </div>
    )
}
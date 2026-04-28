'use client'
import {useState} from 'react'
import { createClient } from '@/lib/supabase/client'
import {useRouter} from 'next/navigation'
import Link from 'next/link'

export default function Signup(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cfmPassword, setCfmPassword] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')
    const passwordMatch = password === cfmPassword
    const router = useRouter()

    async function handleSumbit(e:React.SubmitEvent<HTMLFormElement>){
        e.preventDefault()
        setSubmitted(true)
        if(passwordMatch){
            const supabase = createClient()
            const {data, error} = await supabase.auth.signUp({
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
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-sm flex flex-col gap-4">
                <form onSubmit={handleSumbit}>
                    <label htmlFor='email-input'>Email</label>
                    <input 
                        name='email-input' 
                        type='text' 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email}
                        className="w-full border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring bg-background text-foreground" >
                    </input>

                    <label htmlFor='email-input'>Password</label>
                    <input 
                        name='password-input' 
                        type='password' 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password}
                        className="w-full border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring bg-background text-foreground" >
                    </input>

                    <label htmlFor='email-input'>Confirm password</label>
                    <input 
                        name='confirm-password-input' 
                        type='password' 
                        onChange={(e) => setCfmPassword(e.target.value)} 
                        value={cfmPassword}
                        className="w-full border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring bg-background text-foreground" >
                    </input>
                    {!passwordMatch && submitted && <p className='text-destructive text-sm'>Passwords do not match</p>}
                    {error && <p className='text-destructive text-sm'>{error}</p>}
                    <button className="w-full bg-primary text-primary-foreground py-2 rounded-md text-sm mt-5 cursor-pointer">Sign up</button>
                </form>
                <Link href='/login' className='text-primary underline'>Have an account? Log in</Link>
            </div>
        </div>
    )
}
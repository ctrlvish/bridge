'use client'
import {useState} from 'react'
import { createClient } from '@/lib/supabase/client'
import {useRouter} from 'next/navigation'


export default function Login(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    async function handleSumbit(e:React.SubmitEvent<HTMLFormElement>){
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
                <form onSubmit={handleSumbit}>
                    <label htmlFor='email-input'>Email</label>
                    <input 
                        name='email-input' 
                        type='text' 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email}
                        className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black" >
                            
                    </input>

                    <label htmlFor='email-input'>Password</label>
                    <input 
                        name='password-input' 
                        type='password' 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password}
                        className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black" >
                    </input>

                    {error && <p className='text-red-800'>{error}</p>}
                    <button className="w-full bg-black text-white py-2 rounded-md text-sm mt-5 cursor-pointer">Sign up</button>
                </form>
            </div>
        </div>
    )
}
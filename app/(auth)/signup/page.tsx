'use client'
import {useState} from 'react'
import { createClient } from '@/lib/supabase/client'
import {useRouter} from 'next/navigation'

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

                    <label htmlFor='email-input'>Confirm password</label>
                    <input 
                        name='confirm-password-input' 
                        type='password' 
                        onChange={(e) => setCfmPassword(e.target.value)} 
                        value={cfmPassword}
                        className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black" >
                    </input>
                    {!passwordMatch && submitted && <p className='text-red-800'>Passwords do not match</p>}
                    {error && <p className='text-red-800'>{error}</p>}
                    <button className="w-full bg-black text-white py-2 rounded-md text-sm mt-5 cursor-pointer">Sign up</button>
                </form>
            </div>
        </div>
    )
}
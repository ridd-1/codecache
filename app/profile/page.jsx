import { auth, signOut } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
    const session = await auth()
    if (!session) {
        redirect("/auth/signin")
    }
    return (
        <main className='min-h-dvh flex justify-center'>
            <div className='my-10 flex flex-col justify-center items-center gap-10'>
                <h1 className='text-center text-3xl text-gray-700 font-semibold uppercase'>{session.user.name}</h1>
                <p className='text-center'>{session.user.email}</p>
                <img src={session.user.image} alt={session.user.name.slice(0, 1).toUpperCase()} className='w-40 h-40 rounded-full' />
                <p className='text-sm text-gray-500'>ID: {session.user.id}</p>

                <form
                    action={async () => {
                        "use server"
                        await signOut()
                    }}
                >
                    <button type='submit' className='bg-red-600 text-white px-26 py-2 rounded-md font-semibold hover:bg-red-700 transition-all duration-200'>Log Out</button>
                </form>

            </div>
        </main>
    )
}

export default page
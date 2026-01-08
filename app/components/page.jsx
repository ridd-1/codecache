import { auth } from '@/auth'
import ComponentDisplay from '@/components/ComponentDisplay'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
    const session = await auth()
    if (!session) {
        redirect("auth/signin")
    }
  return (
    <main>
        <ComponentDisplay session={session}/>
    </main>
  )
}

export default page

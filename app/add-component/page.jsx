"use server"
import { auth } from "@/auth";
import ComponentsForm from "@/components/ComponentsForm";
import { redirect } from "next/navigation";
import React from "react";


const page = async () => {
    const session = await auth()
    if(!session) {
        redirect("/auth/signin")
    }
    return(
        <main className="min-h-dvh">
            <ComponentsForm session={session}/>
        </main>
    )
}

export default page
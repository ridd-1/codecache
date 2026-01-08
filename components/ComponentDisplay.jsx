"use client"
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { TbLoader3 } from "react-icons/tb";
import { doc, deleteDoc } from "firebase/firestore";

const ComponentDisplay = ({session}) => {

    const [components, setComponents] = useState([])
    const [loading, setLoading] = useState(true);
    const [copiedId, setCopiedId] = useState(null); 
    
    const handleFetch = async () => {
        const componentArray = []
        const querySnapshot = await getDocs(collection(db, "library"));
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const componentObject = {
            id: doc.id,
            ...doc.data()
        }
        componentArray.push(componentObject)

        });

        setComponents(componentArray)
        setLoading(false)
    }

    useEffect(() => { handleFetch() }, [])

    const handleDelete  = async (id) => {
        await deleteDoc(doc(db, "library", id))
    }

    const copyToClipboard = async (text, id) =>{
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error(`unable to copy code`, err);
        }
    };

    return(
        <main className="min-h-dvh"> 
            <section className="bg-[url('/bg.png')] h-[20vh]">
                <div className="h-[20vh] bg-black/50 flex items-center justify-center">
                    <h1 className="text-white text-center md:text-2xl text-lg font-semibold">Explore our 
                    catalogue of Components from diverse Developers</h1>
                </div>
            </section>

            {
                loading ? <div className="h-[70vh] flex items-center justify-center"><TbLoader3 className="animate-spin text-3xl text-center"/></div>:
            <section className="grid lg:grid-cols-3 md:grid-cols-2 md:p-10 p-3 gap-5">
                {
                    components.map((data, index) => (
                <div key={index} className="shadow-md p-4 rounded-md">
                    <div className="flex items-center justify-between">
                         <span className="flex items-center gap-2">
                            <img src={data.img} alt={data.author} className="w-8 h-8 rounded-full" />
                            <p>{data.author}</p>
                         </span>
                         {
                            session.user.id == data.userId ?
                         <button onClick={()=> handleDelete(data.id)}>
                            <FaTrash className="text-red-600"/>
                         </button> : null
                         }
                    </div>

                    <div>
                        <h1 className="text-center my-4 font-semibold uppercase">{data.name}</h1>
                        <p className="line-clamp-5 text-sm mb-4">{data.component}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">{data.timestamp}</p>
                        
                        <div className="relative">
                            {copiedId === data.id && (
                                <span className="absolute -top-6 left-0 text-[10px] text-green-600 font-bold">
                                    Copied!
                                </span>
                            )}
                            
                            <span 
                                className="flex items-center gap-1 text-sm cursor-pointer"
                                onClick={() => copyToClipboard(data.component, data.id)}
                            >
                                <IoCopyOutline />
                                <p>Copy Code</p>
                            </span>
                        </div>
                    </div>
                </div>

                    ))
                }

            </section>

            }

        </main>
    )
}

export default ComponentDisplay
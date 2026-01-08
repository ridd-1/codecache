"use client"
import Image from "next/image";
import Link from "next/link";
import { LuUserRoundPen } from "react-icons/lu";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { useState } from "react";
import { useSession } from "next-auth/react"
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { signOut } from "next-auth/react"


export default function Navbar() {
    const { data: session } = useSession()
    console.log(session);
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
        const handleClose = () => {
            setAnchorEl(null);
        };

    const [navOpen, setNavOpen] = useState(false)
    console.log(navOpen);

    const handleNavigation = () => {
        if (navOpen) {
            setNavOpen(false);
        }
    };

    const navItems = [
        {
            label: "Home",
            url: "/"
        },

        {
            label: "Components",
            url: "/components"
        },

        {
            label: "About Us",
            url: "/about"
        },

        {
            label: "Contact Us",
            url: "/contact"
        },
    ]

    return (
        <main className="p-5 shadow-md flex items-center justify-between relative">
            <Link href={'/'} className="flex items-center gap-1 z-40">
                <Image src={"/logo.png"} alt="logo" width={500} height={500} className="w-7 h-7" />
                <p className="text-xl max-md:hidden">CodeCache</p>
            </Link>

            <div className="flex items-center gap-7 max-lg:hidden">
                {
                    navItems.map((item, index) => (
                        <Link key={index} href={item.url} className="text-lg hover:text-amber-600">{item.label}</Link>
                    ))
                }
            </div>

            {
                session ?  
            <div className="max-lg:ml-auto">
            <button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <Avatar alt={session?.user?.name} src={session?.user?.image} />
                </button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                    list: {
                        'aria-labelledby': 'basic-button',
                    },
                    }}
                >
                    <MenuItem onClick={handleClose}><Link href={"/profile"}>My Account</Link></MenuItem>
                    <MenuItem onClick={handleClose}><Link href={"/add-component"}>Add Component</Link></MenuItem>
                    <MenuItem onClick={handleClose}><button onClick={() => signOut()}>Sign Out</button></MenuItem>
                </Menu>
                </div>:
                <Link href={"/auth/signin"} className="flex items-center gap-1 text-lg
                hover:text-amber-600 max-lg:ml-auto z-40">
                <p className="max-md:hidden">Sign In</p>
                <LuUserRoundPen />
            </Link>
            }

            {/* mobile and tablet navbar view */}
            <div className={`h-dvh bg-white w-full lg:hidden absolute top-0 right-0 flex-col flex gap-12 items-center pt-20 ${navOpen ? "block" : "hidden"}`}>
                {
                    navItems.map((item, index) => (
                        <Link key={index} href={item.url} className="text-lg hover:text-amber-600" 
                        onClick={handleNavigation}>{item.label}
                        </Link>
                    ))
                }
            </div>
                
            <button onClick={() => setNavOpen(!navOpen)} className="lg:hidden text-xl ml-5 z-40">
                {
                    navOpen ? <IoMdClose /> : <IoIosMenu />
                }
            </button>
            

        </main>
    )

}
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaXTwitter, FaPinterest } from "react-icons/fa6";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <main className='flex max-lg:flex-col max-lg:space-y-5 items-center justify-between p-5 border-t border-gray-300'>
      <Link href={'/'} className="flex items-center gap-1 z-40">
        <Image src={"/logo.png"} alt="logo" width={500} height={500} className="w-7 h-7" />

        <p className="text-xl max-md:hidden">CodeCache</p>
      </Link>

      <div className='flex max-md:flex-col items-center gap-5 text-xs'>
        <a href="#">Blog</a>
        <a href="#">Contact Us</a>
        <a href="#">Chat with Us</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Use</a>
      </div>

      <div className='flex items-center gap-3 text-xl'>
        <FaXTwitter />
        <FaFacebookF className='text-blue-500' />
        <FaInstagram className='text-pink-500' />
        <FaYoutube className='text-red-600' />
        <FaPinterest className='text-red-400' />
      </div>
    </main>
  )
}

export default Footer
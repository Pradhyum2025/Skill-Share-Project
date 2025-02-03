import React from 'react'
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io";

export default function SocialMedia() {
  return (
    <div>
      <div className="grid grid-flow-col gap-4">
        <a>
          <FaFacebook  className='text-[1.4rem]'/>
        </a>
        <a>
          <FaInstagram  className='text-[1.4rem]'/>
        </a>
        <a>
          <FaXTwitter className='text-[1.4rem]'/>
        </a>
        <a>
          <IoLogoGithub className='text-[1.4rem]'/>
        </a>
        <a>
          <FaYoutube className='text-[1.4rem]' />
        </a>
      </div>
    </div>
  )
}

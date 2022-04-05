import React from 'react'

export default function Header() {
  return (
    <div>
        <div className="relative top-0 pt-16 flex flex-col justify-center items-center m">
            <p className = 'text-8xl absolute top-0 font-Lora whitespace-nowrap'>Addis Blog</p>
            <img src="https://media.istockphoto.com/photos/panoramic-view-of-colorful-sunrise-in-mountains-picture-id620951116?k=20&m=620951116&s=612x612&w=0&h=J98krM_DhMkVpAzPOxfgT15jAD8PWQrtdrQftyxHjbE=" alt="" className = 'w-full h-[700px] object-cover' />
        </div>
    </div>
  )
}

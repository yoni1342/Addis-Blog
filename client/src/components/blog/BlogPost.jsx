import React from 'react'
import { Link } from 'react-router-dom'


export default function BlogPost({post}) {
  const PF = 'http://localhost:5000/images/'
  return (
    
    <Link to ={`/post/${post._id}`}>
    <div className = 'p-10 flex flex-col items-center w-[27rem]  border space-y-4 rounded-2xl bg-white m-4 cursor-pointer hover:shadow-md'>
      <img src={ post.photo ? (PF+post.photo):("https://www.emergingedtech.com/wp/wp-content/uploads/2018/04/blogging.jpg")} alt="" className = 'w-96 h-60 object-cover '/>
      <div className = 'flex space-x-3'>
        {
          post.categories.map(cat=>(
            <p className = 'text-xs font-extralight text-gray-500'>{post.cat}</p>
          ))
        }
      </div>
        <h1 className = 'text-2xl font-bold font-Jose capitalize'>{post.title}</h1>
      <p className = 'text-xs font-extralight text-gray-500 '>{new Date(post.createdAt).toDateString()}</p>
      <p className = 'font-VarelaRound text-sm line-clamp-3'>{post.desc}</p>
    </div>
      </Link>
  )
}

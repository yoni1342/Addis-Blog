import React from 'react'
import BlogPost from '../blog/BlogPost'

export default function Blogs({posts}) {
  return (
    
      <div className ='grid grid-cols-1  2xl:grid-cols-2 px-10 flex-[9]'>
        {posts.map(p=>(<BlogPost key = {p._id} post = {p}/>))}
      </div>
  )
}

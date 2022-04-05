import React, { useContext, useEffect, useState } from 'react'
import {TrashIcon, PencilAltIcon} from '@heroicons/react/outline'
import { useLocation } from 'react-router'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split('/')[2]
  const PF = 'http://localhost:5000/images/'
  const [post, setPost] = useState({});
  const {user} = useContext(Context);
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [updateMode, setUpdateMode] = useState(false)
  // console.log(user);

  useEffect(()=>{
    const getPost = async()=>{
      const res = await axios.get('http://localhost:5000/api/posts/'+path)
      setPost(res.data);
      setTitle(res.data.title)
      setDesc(res.data.desc)
    }
    getPost();
  },[path])

  //Delete Post
  const deleteHandeler = async()=>{
    try{
      const res = await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {data:{username: user.username}});
      window.location.replace('/')
    }catch(err){
      console.log(err)
    }
  }
  const editHandeler = async()=>{
    try{
      const res = await axios.put(`http://localhost:5000/api/posts/${post._id}`, {
        title,
        desc,
        categories: ['tech', 'life', 'NFT'],
        username: user.username
      })
      setUpdateMode(false);
      window.location.reload();
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className = 'flex-[9] m-10 relative'>
        <img src={ post.photo ? (PF+post.photo):("https://www.emergingedtech.com/wp/wp-content/uploads/2018/04/blogging.jpg")} alt="" className='rounded-3xl w-[1900px] h-[400px] object-cover'/>
        <div className ='flex justify-between my-10 mx-16'>
          {updateMode ? (<input type='text' value = {title} className = 'outline p-2 text-3xl capitalize font-VarelaRound font-extrabold'onChange= {(e)=>{setTitle(e.target.value)}}/>) : (
          <h1 className ='text-3xl font-VarelaRound font-extrabold capitalize'>{post.title}</h1>
          )
          }
          {
            post.username === user?.username &&
              <div className ='flex items-center'>
                 {
                    updateMode && <button className = 'bg-green-500 text-white px-5 h-10 rounded-full mx-3 hover:shadow-md active:scale-95 transition-all duration-150 ease-in-out ' onClick = {editHandeler}>Update</button>
                }
                <TrashIcon className = 'w-8 text-red-500 cursor-pointer rounded-full hover:shadow-lg hover:text-red-400 active:scale-95 transition duration-100 ease-in-out' onClick = {deleteHandeler}/>
                <PencilAltIcon className = 'w-8 text-green-500 cursor-pointer rounded-full hover:shadow-lg hover:text-green-400 active:scale-95 transition duration-100 ease-in-out' onClick = {()=>{setUpdateMode(true)}}/>
              </div>
          }
        </div>
        <div className ='flex justify-between text-yellow-700 text-xs font-light capitalize'>
            <p> Author: 
              <Link to = {`/?user=${post.username}`}>
                <span className ='font-bold text-sm'>{post.username}
                </span>
              </Link>
            </p>
            <p>{new Date(post.createdAt).toDateString()}</p>
        </div>
        <div className ='text-gray-800'>
          {
            updateMode ? (
              <textarea value = {desc} type = 'text' autoCorrect autoFocus className = 'w-full h-screen p-3' onChange = {(e)=>{setDesc(e.target.value)}}></textarea>
            ):(
              <p className = 'leading-8 first-letter:ml-[20px] first-letter:text-2xl first-letter:font-bold font-Roboto text-left p-5 text-xl'>
                {post.desc}
              </p>
            )
          }
        </div>
       
    </div>

  )
}

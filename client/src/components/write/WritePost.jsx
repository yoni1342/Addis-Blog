import React, { useContext, useState } from 'react'
import { PlusCircleIcon } from '@heroicons/react/outline'
import {Context}  from '../../context/Context'
import axios from 'axios';
export default function WritePost() {
  const user = useContext(Context)
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  console.log(user.user.username)
  const handeler = async(e)=>{
    e.preventDefault();
    const newPost = {
      title,
      desc,
      username: user.user.username,
      categories: ["life","tech", "job"],
    };
    if(file){
      const data = new FormData();
      const filename = Date.now()+file.name;
      data.append("name", filename)
      data.append("file", file)
      newPost.photo = filename;
      try{
        await axios.post("http://localhost:5000/api/upload",data);
      }catch(err){
        console.log(err)
      }
    }
    try{
      const res =  await axios.post('http://localhost:5000/api/posts/create', newPost)
      window.location.replace('/post/'+res.data._id)
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className ='flex items-center justify-center flex-col'>
      {
        file ? (
          <img src={URL.createObjectURL(file)} alt="" className='rounded-3xl w-[1200px] h-[400px] object-cover'/>
        ):(
          <img src='https://www.emergingedtech.com/wp/wp-content/uploads/2018/04/blogging.jpg' alt="" className='rounded-3xl w-[1200px] h-[400px] object-cover'/>
        )
      }
        <form className = ' items-center flex flex-col m-10 space-y-10' onSubmit = {handeler}>
           <div className='items-center flex  m-10 space-x-10'>
             <label htmlFor="fileInput">
            <PlusCircleIcon className = 'w-10 text-gray-500'/>
             </label>
            <input type="file" id = 'fileInput' className = 'hidden' onChange = {e=>setFile(e.target.files[0])}/>
            <input type="text" placeholder = 'Title' className='w-96 outline-none rounded-lg px-2 text-lg font-bold font-VarelaRound capitalize h-10' onChange = {e=>setTitle(e.target.value)} maxLength = '60'/>
            <button className ='bg-gray-600 text-white p-3 rounded-2xl hover:shadow-lg active:scale-95 font-Jose text-lg text-center transition duration-150 ease-in-out cursor-pointer' type = 'submit'>Publish</button>
           </div>
          <div className = 'mb-20'>
              <textarea placeholder ='write your blog' type = 'text' autoCorrect autoFocus className ='w-[40rem] h-[20rem] font-Jose rounded-3xl p-10 text-lg text-gray-700  resize-none' onChange = {e=>setDesc(e.target.value)}></textarea>
          </div>
        </form>
    </div>
  )
}

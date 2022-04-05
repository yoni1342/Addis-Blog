import React, { useContext, useEffect, useState } from 'react'
import {UserCircleIcon} from '@heroicons/react/outline'
import { Context } from '../../context/Context'
import axios from 'axios'
export default function SettingComp() {
  const {user} = useContext(Context)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [success, setSuccess]  = useState(false);
  const PF = 'http://localhost:5000/images/'
  const [pop, setPop] = useState(false);

  useEffect(()=>{
    setUsername(user.username);
    setEmail(user.email);
    setPassword(user.password);
  },[])
  const updateHandeler = async(e)=>{
    e.preventDefault()
      const updatedUser = {
        userId: user._id,
        username,
        password,
        email
      }
      if(file){
        const data = new FormData();
        const filename = Date.now()+file.name;
        data.append("name", filename)
        data.append("file", file)
        updatedUser.profilePic = filename
        try{
          await axios.post('http://localhost:5000/api/upload', data)
        }catch(err){
          console.log(err);
        }
      }
      try{
        const res = await axios.put(`http://localhost:5000/api/users/${user._id}`, updatedUser)
        console.log(res);
        console.log(user);
        window.location.reload()
        localStorage.setItem('user', JSON.stringify(res.data))
        setSuccess(true);
      }catch(err){
        console.log(err);
      }
      
  }
  const deleteHandeler = async()=>{
    try{
      axios.delete(`http://localhost:5000/api/users/${user._id}`, {data: {userId: user._id}})
      localStorage.clear('user');
      window.location.replace('/');

    }catch(err){

    }
  }
  return (
    <div className ='flex-[9] items-center relative '>
        <div className = 'flex justify-between items-center mx-10'>
            <h1 className = 'text-2xl text-gray-600'>Update Your Account</h1>
            <button className = 'text-red-500 hover:shadow-md rounded-md p-2 active:scale-95 transition duration-150 ease-in-out cursor-pointer' onClick = {()=>setPop(true)}>Delete Account</button>
        </div>
        <form action="" className ='flex flex-col m-10' onSubmit = {updateHandeler}>
          <label className = 'text-xl font-bold font-VarelaRound'>Profile Picture</label>
          <div className = 'flex items-center space-x-5 '>
            {file?(
              <img src={URL.createObjectURL(file)} alt=""  className ='w-40 h-40 object-cover rounded-full'/>
            ):(
              <img src={user.profilePic ? (PF+user.profilePic) : ("https://erasmuscoursescroatia.com/wp-content/uploads/2015/11/no-user.jpg")} alt=""  className ='w-40 h-40 object-cover rounded-full'/>
            )}
            <label htmlFor="fileInput">
              <UserCircleIcon  className = 'w-10 cursor-pointer text-green-600'/>
            </label>
          </div>
          <input type="file" id='fileInput' className = 'hidden' onChange = {(e)=>{setFile(e.target.files[0])}} />
          <div className = 'flex flex-col w-52 space-y-3 m-5'>
            <label htmlFor="username">Username</label>
            <input type="text" id='username' value = {username}  className = 'p-2 rounded-lg' onChange = {(e)=>{setUsername(e.target.value)}}/>
          </div>
          <div className = 'flex flex-col w-64 space-y-3 m-5'>
            <label htmlFor="email">Email</label>
            <input type="email" id='email' value = {email} className = 'p-2 rounded-lg'onChange= {(e)=>{setEmail(e.target.value)}} />
          </div>
          <div className = 'flex flex-col w-64 space-y-3 m-5'>
            <label htmlFor="password">Password</label>
            <input type="password" id='password'   className = 'p-2 rounded-lg' onChange={e=>{setPassword(e.target.value)}}/>
          </div>
          <button className = 'bg-green-600 w-20 text-white p-2 rounded-2xl hover:shadow-lg active:scale-95 transition duration-150 ease-in-out' type = 'submit'>Update</button>
          {
            success && <p className = 'text-green-500 my-4 text-xl shadow-xl w-52'>Update Successfully</p>
          }
        </form>
         {
           pop ? (
             
             <div className = 'absolute top-0 left-0 bg-gray-200 p-10 w-screen h-full opacity-90 flex flex-col justify-center items-center'>
               <div className = 'bg-white p-10 w-[1000px] h-[600px] flex flex-col items-center justify-center'>
                <p className = 'text-3xl'>Are you sure you want to delet this user? <br/> If you want click <span className = 'font-bold'>"Yes"</span> but all your posts also be deleted</p>
                <div className = 'space-x-10 m-5 '>
                  <button className = 'bg-green-500 px-8 py-1 rounded-full text-white hover:shadow-md active:scale-95 transition-all duration-150 ease-in-out' onClick = {deleteHandeler}>Yes</button>
                  <button className = 'bg-red-500 px-8 py-1 rounded-full text-white hover:shadow-md active:scale-95 transition-all duration-150 ease-in-out' onClick = {()=>setPop(false)}>No</button>
                </div>
               </div>
             </div>
           ):(<p></p>)
         }
    </div>
  )
}


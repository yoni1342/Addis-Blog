import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  console.log(password)

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      const res = await axios.post('http://localhost:5000/api/auth/register',{
        username,
        email,
        password
      })
      res.data && window.location.replace('/login')
    }catch(err){
      setError(true);
    }
  }
  return (
    <div className = 'relative'>
        <img src="https://i.pinimg.com/736x/10/7d/6e/107d6ea215157907ea7fc8cac142abde.jpg" alt="" className = 'w-full h-screen object-cover opacity-30'/>
        <div className = 'absolute top-[30%] left-[40%]'>
            <h1 className = 'text-4xl font-VarelaRound font-bold m-10'>Register</h1>
            <form action="" className = 'flex flex-col' onSubmit = {handleSubmit}>
                <label htmlFor="username" className = 'text-lg font-bold font-VarelaRound mb-2' >Username</label>
                <input type="text" id='username' placeholder = 'example' className = 'p-2 rounded-md mb-5 w-96' onChange = {e=>setUsername(e.target.value)}/> 
                <label htmlFor="email" className = 'text-lg font-bold font-VarelaRound mb-2'>Email</label>
                <input type="email" id='email' placeholder = 'example@gmail.com' className = 'p-2 rounded-md mb-5 w-96'onChange = {e=>setEmail(e.target.value)}/>
                <label htmlFor="password" className = 'text-lg font-bold font-VarelaRound mb-2'>Password</label>
                <input type="password" id='password' placeholder = 'Password' className = 'p-2 rounded-md mb-5'onChange = {e=>setPassword(e.target.value)}/>
                <button className = 'bg-gray-800 text-white w-40 p-2 rounded-3xl text-lg font-extrabold font-Jose hover:shadow-xl active:scale-95 transition duration-150 ease-in-out'>Register</button>
        {error && <p className = 'py-4 text-red-500'>Something went wrong!</p>}
            </form>
        </div>
        <Link to = '/login'>
            <button className = 'absolute top-[5%] left-[90%] bg-gray-700 p-3 text-lg text-white rounded-2xl font-Jose hover:shadow-xl active:scale-95 transition duration-150 ease-in-out'>Login</button>
        </Link>
    </div>
  )
}

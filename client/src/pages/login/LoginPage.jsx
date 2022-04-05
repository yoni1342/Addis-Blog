import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import axios from 'axios';

export default function LoginPage() {
  const [error, setError] = useState(false)
  const userRef = useRef()
  const passwordRef = useRef()
  
  const {dispatch, isFetching} = useContext(Context)
  
  const handleSubmit = async(e)=>{
    e.preventDefault()
    dispatch({type:'LOGIN_START'})
    try{
      const res = await axios.post('http://localhost:5000/api/auth/login',{
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({type:'LOGIN_SUCCESS', payload:res.data})
    }catch(err){
      setError(true)
       dispatch({type:'LOGIN_FAILURE'})      
    }
  }
  return (
    <div className = 'relative'>
        <img src="https://i.pinimg.com/736x/10/7d/6e/107d6ea215157907ea7fc8cac142abde.jpg" alt="" className = 'w-full h-screen object-cover opacity-30'/>
        <div className = 'absolute top-[30%] left-[40%]'>
            <h1 className = 'text-4xl font-VarelaRound font-bold m-10'>Login</h1>
            <form action="" className = 'flex flex-col' onSubmit = {handleSubmit}>
                <label htmlFor="username" className = 'text-lg font-bold font-VarelaRound mb-2'>Username</label>
                <input type="text" id='username' placeholder = 'username' className = 'p-2 rounded-md mb-5 w-96' ref ={userRef}/>
                <label htmlFor="password" className = 'text-lg font-bold font-VarelaRound mb-2'>Password</label>
                <input type="password" id='password' placeholder = 'Password' className = 'p-2 rounded-md mb-5'ref ={passwordRef}/>
                <button className = 'bg-gray-800 disabled:bg-gray-500 text-white w-40 p-2 rounded-3xl text-lg font-extrabold font-Jose hover:shadow-xl active:scale-95 transition duration-150 ease-in-out ' type ='submit' disabled={isFetching}>{isFetching?(
                  <span className = 'animate-pulse text-gray-500'>Loading...</span>
                ):(
                  <span>Login</span>
                )}</button>
                {error && <span className = 'text-red-500 p-4 cursor-not-allowed'>Wrong Credential!</span>}
            </form>
        </div>
        <Link to ='/register'>
          <button className = 'absolute top-[5%] left-[90%] bg-gray-700 p-3 text-lg text-white rounded-2xl font-Jose hover:shadow-xl active:scale-95 transition duration-150 ease-in-out'>Register</button>
        </Link>
        
    </div>
  )
}

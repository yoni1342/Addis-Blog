import React, { useContext, useState } from 'react'
import logo from '../../logo_transparent.png'
import { SearchIcon, MenuIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
export default function Header() {
    const PF = 'http://localhost:5000/images/'
    const {user, dispatch} = useContext(Context);
    const [showMenu, setShowMenu] = useState(false);
    const menu = 
    <div className ='fixed top-16 w-full bg-white left-0 flex justify-center h-full items-center opacity-90 flex-col space-y-10 lg:hidden'>
        <nav className = 'flex flex-col space-y-10 items-center opacity-100 justify-center'>
               <Link to = '/'> <p className = 'px-3 text-xl font-light uppercase hover:nav active:nav-acti'>Home</p> </Link>
               <Link to = '/about'><p className = 'px-3 text-xl font-light uppercase hover:nav'>About</p>  </Link>  
               <Link to = '/contact'> <p className = 'px-3 text-xl font-light uppercase hover:nav'>Contact</p> </Link>
               <Link to = '/write'> <p className = 'px-3 text-xl font-light uppercase hover:nav'>Write</p> </Link>
               {user?(
                   <Link to = '/login'> <p className = 'px-3 text-xl font-light uppercase hover:nav'>LogOut</p> </Link>
               ):(
                <Link to = '/login'> <p className = 'px-3 text-xl font-light uppercase hover:nav'>Login</p> </Link>
               )
               }
        </nav>
        <div className= 'space-x-5 justify-end  inline-flex'>
            <Link to = '/setting'><img src={"https://i.ibb.co/VLq3HK4/yoni.jpg"} alt="d" className = 'rounded-full w-12 h-12 object-cover'/></Link>
            <SearchIcon width = '20'/>
        </div>
    </div>
    const logouthandeler = ()=>{
        dispatch({type:'LOGOUT'})
        localStorage.clear('user');
    }
  return (
    <header className = 'flex flex-col items-center sticky top-0 z-10'>
        {/* TOP LOGO */}
        <div className = 'grid grid-cols-2 lg:grid-cols-3 items-center w-full bg-gray-100 px-10 h-16'>
        <div className = 'flex h-0 items-center justify-start flex-grow cursor-pointer'>
            <img src={logo} alt="logo" className= 'w-40 ' />
        </div>
        <div className=''>

            <nav className = 'space-x-5 flex-grow hidden lg:inline-flex justify-center'>
                <Link to = '/'> <p className = 'px-3 text-xl font-light uppercase hover:nav active:nav-acti'>Home</p> </Link>
               <Link to = '/about'><p className = 'px-3 text-xl font-light uppercase hover:nav'>About</p>  </Link>  
               <Link to = '/contact'> <p className = 'px-3 text-xl font-light uppercase hover:nav'>Contact</p> </Link>
               <Link to = '/write'> <p className = 'px-3 text-xl font-light uppercase hover:nav'>Write</p> </Link>
               <div className ='flex'>
                {user &&(
                   <p className = 'px-3 text-xl font-light uppercase hover:nav' onClick = {logouthandeler}>LogOut</p> 
                )
               }
               </div>
               </nav>
        </div>
            <div className= 'space-x-5 justify-end hidden lg:inline-flex'>
                {user?(
                    <Link to = '/setting'><img src={ user.profilePic ? (PF+user.profilePic) : ('https://erasmuscoursescroatia.com/wp-content/uploads/2015/11/no-user.jpg')} alt="" className = 'rounded-full w-12 h-12 object-cover'/></Link>

                ):(
                    <>
                    <Link to = '/login'> <p className = 'px-3 text-xl font-light uppercase hover:nav'>Login</p> </Link>
                    <Link to = '/register'> <p className = 'px-3 text-xl font-light uppercase hover:nav'>Register</p> </Link></>
                )}
                <SearchIcon width = '20'/>
            </div>
            <div className = 'lg:hidden flex justify-end' onClick = {()=>{setShowMenu(!showMenu)}}>
                <MenuIcon width = '40' className = 'hover:shadow-md rounded-lg cursor-pointer' />
            </div>
            {showMenu?menu:null}
        </div>
    </header>
  )
}

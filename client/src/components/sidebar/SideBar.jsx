import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
export default function SideBar() {
  const [cats, setCats] = useState([]);

  useEffect(()=>{
    const getCats = async()=>{
      const res = await axios.get('http://localhost:5000/api/category/');
      setCats(res.data)
    }
    getCats()
  },[])
  return (
    <div className = 'w-96 mt-10 ml-40 px-10 flex-[3] h-screen' >
        <p className ='w-full border-y-2 items-center flex justify-center border-gray-500 text-gray-500 uppercase'>About Me</p>
        <img src="https://i0.wp.com/www.thedabigal.com.ng/wp-content/uploads/2020/06/12-year-old-black-boy-whose-protest-song-went-viral-signed-by-Warner-Records-Video-lailasnews.jpg?fit=1400%2C1400&ssl=1" alt="" className = 'mt-10 w-96 '/>
        <p className ='mt-8 font-VarelaRound'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus aperiam qui nisi, maxime atque blanditiis totam perspiciatis! Voluptates ipsum eos rem illo, praesentium voluptatum, quidem atque eaque, ipsa libero inventore.</p>
        <p className ='w-full border-y-2 items-center flex justify-center border-gray-500 text-gray-500 uppercase mt-10'>Categories</p>
        <div className ='capitalize grid grid-cols-2 items-center justify-end font-Jose mt-5 ml-10'>
          {cats.map(cat =>(
            <Link to = {`/?cat=${cat.name}`}>
            <p className = 'cursor-pointer'>{cat.name}</p>
            </Link>
          ))}
        </div>
    </div>
  )
}

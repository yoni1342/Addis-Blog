import React, { useEffect, useState } from 'react'
import Blogs from '../../components/blogs/Blogs'
import Header from '../../components/header/Header'
import SideBar from '../../components/sidebar/SideBar'
import axios from 'axios'
import { useLocation } from 'react-router'

function Home() {

  const [posts, setPosts] = useState([]);

  const {search} = useLocation();

  const base = axios.create({baseURL:'http://localhost:5000/api'})
  useEffect(()=>{
     async function fetchPost() {
      const res = await base.get("/posts"+search)
      console.log(res.data)
      setPosts(res.data)
    } 
    fetchPost();
  }, [search])


  return (
    <div className = 'home'>
        <Header/>
        <div className = 'flex '>
          <Blogs key={posts} posts = {posts}/>
          <SideBar />
        </div>
    </div>
  )
}

export default Home
import React from 'react'
import SideBar from '../../components/sidebar/SideBar'
import SinglePost from '../../components/singlePost/SinglePost'

export default function Single() {
  return (
    <div className ='flex'>
        <SinglePost />
        <SideBar />
    </div>

  )
}

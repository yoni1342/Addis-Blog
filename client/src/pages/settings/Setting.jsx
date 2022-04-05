import React from 'react'
import SettingComp from '../../components/setting/SettingComp'
import SideBar from '../../components/sidebar/SideBar'

export default function Setting() {
  return (
    <div className = 'flex'>
        <SettingComp />
        <SideBar />
    </div>
  )
}

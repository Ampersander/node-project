import React from 'react'
import FriendsCard from '../FriendsCard/FriendsCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard/ProfileCard'
import './ProfileSide.css'
const ProfileSide = () => {
  return (
    <div className="ProfileSide">
        <LogoSearch/>
        <ProfileCard location = 'homepage'/>
        <FriendsCard/>
    </div>
    )
}

export default ProfileSide
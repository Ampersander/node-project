import React from 'react'
import FriendsCard from '../FriendsCard/FriendsCard'
import InfoCard from '../InfoCard/InfoCard'
import LogoSearch from '../LogoSearch/LogoSearch'

const ProfileLeft = () => {
  return (
    <div className="ProfileSide">
        <LogoSearch/>
        <InfoCard/>
        <FriendsCard/>
    </div>
  )
}

export default ProfileLeft
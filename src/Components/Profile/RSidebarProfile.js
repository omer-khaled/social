import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux';
import ActualFriends from './ActualFriends';
import FriendListProfile from './FriendListProfile';
function RSidebarProfile() {
    let user = useSelector(state=>state.user);
    return (
        <aside style={{color:"var(--main-color)",background:"var(--brand-background-div)"}} className='lsidebar mt-1 w-40 d-flex justify-content-center align-items-start flex-column'>
            <FriendListProfile />
            <div className='br'></div>
            <ActualFriends />
        </aside>
    )
}
export default RSidebarProfile;

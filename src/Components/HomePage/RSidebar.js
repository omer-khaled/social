import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux';
import FriendList from './FriendList';
function RSidebar() {
    let user = useSelector(state=>state.user);
    return (
        <aside style={{color:"var(--main-color)",background:"var(--brand-background-div)"}} className='lsidebar d-flex justify-content-center align-items-start flex-column'>
            <FriendList  friends={user.friends}/>
            <div className='br'></div>
        </aside>
    )
}
export default RSidebar;

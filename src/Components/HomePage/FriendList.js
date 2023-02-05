import React from 'react'
import CreateFrined from './CreateFrined';
import {  useSelector } from 'react-redux';
function FriendList() {
    let friends = (useSelector(state=>state.user)).friends;
    return (
            <div className='d-flex w-100 justify-content-center ps-2 flex-column align-items-start'>
                <p className='follow'>Follow List</p>
                {
                    (friends.length!==0)? friends.map((el,index)=>{
                        return(<CreateFrined key={el} id={el} />);
                    }):<div className='empty'>Follow new people</div>
                }
            </div>
    )
}

export default FriendList;
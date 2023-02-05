import React from 'react'
import CreateFrinedProfile from './CreateFrinedProfile';
import {  useSelector } from 'react-redux';
function FriendListProfile() {
    let friends = (useSelector(state=>state.user)).watingList;
    return (
            <div className='d-flex w-100 justify-content-center ps-2 flex-column align-items-start'>
                {(friends.length!==0)?
                    <React.Fragment>
                        <p className='follow'>{friends.length} of friends requests</p>
                        {friends.map((el,index)=>{
                            return(<CreateFrinedProfile key={el} id={el} />);
                        })}
                    </React.Fragment> 
                    :<div className='empty'>Follow new people</div>
                }  
            </div>
    )
}

export default FriendListProfile;
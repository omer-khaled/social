import React from 'react'
import {  useSelector } from 'react-redux';
import CreateActualFriend from './CreateActualFriend';
function ActualFriends() {
        let friends = (useSelector(state=>state.user)).actualFreinds;
        return (
            <div className='d-flex w-100 justify-content-center ps-2 flex-column align-items-start'>
                {(friends.length!==0)?
                    <React.Fragment>
                        <p className='follow'>Already Friends: </p>
                        {friends.map((el,index)=>{
                            return(<CreateActualFriend key={el} id={el} />);
                        })}
                    </React.Fragment> 
                    :<div className='follow'>add new Freinds</div>
                }  
            </div>
        )
}
export default ActualFriends;

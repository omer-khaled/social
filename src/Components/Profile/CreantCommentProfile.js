import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function CreantCommentProfile({index,idofcom}) {
    let [userofcoment,setuserofcoment] = useState('');
    let profilePost = useSelector(state=>state.profilePost);
    useEffect(()=>{
        getownuser();
    },[]);
    const getownuser = async()=>{
        let fetched = await fetch(`http://localhost:3004/users/${(profilePost[index])["comments"][idofcom].userId}`);
        let res = await fetched.json();
        setuserofcoment({...(res)});
    }
    return (
        <React.Fragment>
            {
                    (userofcoment!=='')?<div className='w-100 d-flex justify-content-between align-content-center'>
                    <div className='w-100 d-flex justify-content-start align-items-center'>
                        <img className='imagcommet' src={userofcoment.img} alt='avatar'/>
                        <div className='info-comment w-100'>
                            <div className='header d-flex justify-content-start align-items-center'> 
                                <Link className='linkpro kt me-2' to={`/social/${userofcoment.id}`}><span>{`${userofcoment.firstName} ${userofcoment.lastName}`}</span></Link>
                                <span className='kt'>{userofcoment.Position}</span>
                            </div>
                            <div className='text-left'>{((profilePost[index])["comments"][idofcom]).body}</div>
                        </div>
                    </div>
                </div>:<React.Fragment></React.Fragment>
            }
        </React.Fragment>
    )
}
export default CreantCommentProfile;

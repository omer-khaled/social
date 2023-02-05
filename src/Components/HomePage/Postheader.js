import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {GET} from '../../contextApp'
function Postheader({userId}) {
    let user = useSelector(state=>state.user);
    let [userofPost,setuserofPost] = useState('');
    let dispatch = useDispatch();
    useEffect(()=>{
        getownuser();
    },[]);
    const getownuser = async()=>{
        let fetched = await fetch(`http://localhost:3004/users/${userId}`);
        let res = await fetched.json();
        setuserofPost({...(res)});
    }
    const addnewFriend = async(newid)=>{
        let filnalResult = [...(user.friends),newid];
        let obj = {...user};
        obj.friends = [...filnalResult];
        let feted = await fetch(`http://localhost:3004/users/${user.id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(obj)
        });
        let data = await feted.json();
        // localStorage.setItem('user',JSON.stringify({...data}))
        dispatch(GET({...data}));
    }
    return (
        <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex justify-content-start align-items-center'>
                <div className='custom-avatar'>
                        <img src={userofPost.img} alt='avatar'/>
                </div>
                <div className='info'>
                    <Link className='linkpro' to={`/${userofPost.id}`}><p>{`${userofPost.firstName} ${userofPost.lastName}`}</p></Link>
                    <span>{userofPost.Locatin}</span>
                </div>
            </div>
            {(user.id!==userofPost.id)?
                    (!(user.friends).includes(Number(userofPost.id)))?<i className="bi bi-plus-lg add-person" onClick={()=>{
                        addnewFriend(Number(userofPost.id));
                    }}>Follow</i>:<React.Fragment></React.Fragment>
            :<React.Fragment></React.Fragment>}
        </div>
    )
}
export default Postheader;

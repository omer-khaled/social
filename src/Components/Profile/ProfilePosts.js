import React,{useState,useEffect} from 'react'
import {  useDispatch, useSelector } from 'react-redux';
import { GetprofilePost } from '../../contextApp';
import PostmakerProfile from './PostmakerProfile';

export default function ProfilePosts({id,userac}) {
    let profilePost = useSelector(state=>state.profilePost);
    let [userProfile,setUserprofile] = useState(userac);
    let dispatch = useDispatch();
    const filterposts = async()=>{
        let fetched = await fetch('http://localhost:3004/posts');
        let data = await fetched.json();
        let allposts = [...data];
        let filterdaallposts = allposts.filter(el=>{
            return el.userId === userProfile.id;
        })
        console.log();
        dispatch(GetprofilePost([...filterdaallposts]));
    }
    useEffect(()=>{
        filterposts();
    },[])
    return (
        <React.Fragment>
            {(userProfile!=="")?
            <section className='w-75 d-flex mb-3 justify-content-center align-items-start flex-column'>
                {
                    (((profilePost).length!==0)&&(userProfile!=''))?((profilePost)).map((el,index)=>{
                        return(<PostmakerProfile key={index} index={(((profilePost).length)-(index+1))} userac={userProfile}  />)
                    }):<div className='empty'></div>
                }
            </section>:<React.Fragment></React.Fragment>}
        </React.Fragment>
    )
}

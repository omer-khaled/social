import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetPost, GetprofilePost } from '../../contextApp';
import Postmaker from './Postmaker';

function Posts() {
    let allposts = useSelector(state=>state.allPosts);
    let user  = useSelector(state=>state.user);
    let dispatch = useDispatch();
    const filterposts = async()=>{
        let fetched = await fetch('http://localhost:3004/posts');
        let data = await fetched.json();
        let allposts = [...data];
        let filterdaallposts = allposts.filter(el=>{
            return el.userId != user.id;
        })
        console.log();
        dispatch(GetPost([...filterdaallposts]));
    }
    useEffect(()=>{
        filterposts();
    },[])
    return (
        <section style={{color:"var(--brand-color)",background:"var(--brand-background)"}} className='w-100 d-flex mb-3 justify-content-center align-items-start flex-column'>
            {(allposts.length!==0)?allposts.map((el,index)=>{
                return(<Postmaker  index={(allposts.length)-(index+1)} key={(allposts.length)-(index+1)}/>)
            }):<div className='empty'></div>}
        </section>
    )
}
export default Posts;

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {GET, GetPost, GetprofilePost} from '../../contextApp'
import Posts from './Posts';

function Ceneterpage() {
    let user  = useSelector(state=>state.user);
    let profilePost = useSelector(state=>state.profilePost);
    let dispatch = useDispatch();
    let [file,setFile] = useState('');
    let [content,setContent] = useState('');
    const submitPost = async()=>{

            let filnalResult = {
                body:content,
                img:(file!=="")?file:"",
                loves:[],
                userId:user.id,
                time:`${(new Date().getHours()>12)?`${(new Date().getHours())-12}`:`${new Date().getHours()}`}:${new Date().getMinutes()} ${(new Date().getHours()>12)?"Pm":"Am"}`,
                date:`${new Date().getDate()}-${(new Date().getMonth())+1}-${new Date().getFullYear()}`,
                comments:[]
            };
            let feted = await fetch(`http://localhost:3004/posts`,{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(filnalResult)
            });
            let data = await feted.json();
            // dispatch(GetprofilePost([...profilePost,{...data}]));
            setContent('');
            setFile('');
    }
    return (
        <section className='centerPage mb-3 d-flex justify-content-center align-items-start flex-column'>
            <form style={{color:"var(--main-color)",background:"var(--brand-background-div)"}} className='w-100 postMaking mb-3' onSubmit={(e)=>{
                    e.preventDefault();
                    submitPost();
                }}>
                <div className='w-100 d-flex justify-content-start align-items-center'>
                    <div className='avatar'>
                        <img src={user.img} alt='avatar'/>
                    </div>
                    <div className='info-post'>
                        <input value={content} className='form-control w-100' type={"text"} placeholder='Add your content' onChange={(e)=>{
                            setContent(e.target.value);
                        }}/>
                    </div>
                </div>
                {
                    (file!=="")?
                    <div className='my-3 image-container'>
                        <img src={file} alt={'post-image'}/>
                    </div>:<div className='my-3 bo'>
                    <input className='form-control opactiy' type={'file'} onChange={(e)=>{
                        let fr = new FileReader();
                        let file = e.target.files[0];
                        fr.onload = ()=>{
                            setFile(fr.result);
                        };
                        fr.readAsDataURL(file);
                    }}>
                    </input>
                    <button onClick={(e)=>{
                        e.preventDefault();
                    }}><i className="bi bi-cloud-upload-fill"></i></button>
                    </div>
                }
                <button type="submit" className="btn btn-primary w-100">Post</button>
            </form>
            <Posts />
        </section>
    )
}
export default  Ceneterpage;
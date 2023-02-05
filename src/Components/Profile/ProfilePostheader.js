import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {GET, GetprofilePost} from '../../contextApp'
function ProfilePostheader({index,post,userac}) {
    let dispatch = useDispatch();
    let user = useSelector(state=>state.user);
    let [el,setEl] = useState(post);
    let profilePost = useSelector(state=>state.profilePost);
    let [content,setContent] = useState(post.body);
    let [file,setFile] = useState('');
    let [open,setOpen] = useState(false);
    const deletePOst = async()=>{
        let fetched = await fetch(`http://localhost:3004/posts/${el.id}`,{
            method:"DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        let res = await fetched.json();
        // let possin = JSON.parse(localStorage.getItem('profilposts'));
        let resultpossin = profilePost.filter((el,ind)=>{
            return ind!=index;
        })
        // localStorage.setItem('profilposts',JSON.stringify([...resultpossin]));
        dispatch(GetprofilePost([...resultpossin]));
    }
    const submitPost = async()=>{
        let obj = {...el};
        obj.body = content;
        obj.img = file;
        let fetched = await fetch(`http://localhost:3004/posts/${el.id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(obj),
        });
        let data = await fetched.json();
        // let possin = JSON.parse(localStorage.getItem('profilposts'));
        let profilePostupdate = [...profilePost];
        profilePostupdate[index] = {...obj};
        // localStorage.setItem('profilposts',JSON.stringify([...possin]));
        dispatch(GetprofilePost([...profilePostupdate]));
        setOpen(false);
    }
    return (
        <>
            {(el!=='')?
                <React.Fragment>
                    {(open!==false)?            
                    <form className='w-100 postMaking mb-3' onSubmit={(e)=>{
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
                            <img src={file} alt={'postimage'}/>
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
                    </form>:<React.Fragment></React.Fragment>}
                    {(userac.id!==undefined)?
                        <div className='d-flex justify-content-between align-items-center' key={post.id}>
                            <div className='d-flex justify-content-start align-items-center'>
                                <div className='custom-avatar'>
                                        <img src={userac.img} alt='avatar'/>
                                </div>
                                <div className='info'>
                                    <Link className='linkpro' to={`/social/${userac.id}`}><p>{`${userac.firstName} ${userac.lastName}`}</p></Link>
                                    <div >
                                        <span className='me-2'><i className="bi bi-clock-history pe-1 icons"></i>{(post.time!==undefined)?post.time:"any time"}</span>
                                        <span className=''><i className="bi bi-calendar3 pe-1 icons"></i>{(post.date!==undefined)?post.date:"any date"}</span>
                                    </div>
                                </div>
                            </div>
                            {(user.id===post.userId)?<div>
                                <i className="bi bi-pencil-fill fs-5 pe-3 btnPro btnPro-edit" onClick={()=>{
                                    setOpen(true);
                                }}></i>
                                <i className="bi bi-trash3 fs-5 pe-3 btnPro btnPro-delete" onClick={()=>{
                                    deletePOst();
                                }}></i>
                            </div>:<React.Fragment></React.Fragment>}
                    </div>:<div className='empty'></div>}
                </React.Fragment>
                :
                <React.Fragment></React.Fragment>
            }
        </>
    )
}
export default ProfilePostheader;

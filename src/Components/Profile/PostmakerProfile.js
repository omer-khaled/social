import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  GetprofilePost } from '../../contextApp';
import CreantCommentProfile from './CreantCommentProfile';
import ProfilePostheader from './ProfilePostheader';
function PostmakerProfile({index,userac}) { 
    let user = useSelector(state=>state.user);
    let profilePost = useSelector(state=>state.profilePost);
    let [active,setActive] = useState(([...(profilePost[index].loves)].includes(user.id))?true:false);
    let [showComment,setShowComment] = useState(false);
    let dispatch = useDispatch();
    let [writeComment,setWriteComment] = useState("");
    let [showAdd,setshowAdd] = useState(false);
    const addnewlove = async()=>{
        let obj = {...(profilePost[index])};
        obj["loves"]= [...(obj["loves"]),user.id];
        let allpostsupdate = [...profilePost];
        let fetched = await fetch(`http://localhost:3004/posts/${(profilePost[index]).id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(obj),
        });
        let res = await fetched.json();
        allpostsupdate[index] = {...res};
        setActive(!active);
        dispatch(GetprofilePost([...allpostsupdate]));
    }
    const removeoldlove = async(newid)=>{
        let obj = {...(profilePost[index])};
        let deltetel = obj["loves"];
        let allpostsupdate = [...profilePost];
        let lovesfilters = (deltetel).filter((el)=>{
            return el !== user.id;
        })
        obj["loves"] = [...lovesfilters];
        let fetched = await fetch(`http://localhost:3004/posts/${(profilePost[index]).id}`,{
            method:"PUt",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(obj),
        });
        let res = await fetched.json();;
        allpostsupdate[index] = {...obj};
        setActive(!active);
        dispatch(GetprofilePost([...allpostsupdate]));
    }
    const addnewComment = async()=>{
        let obj = {...(profilePost[index])};
        obj["comments"]= [...(obj["comments"]),{
            userId:user.id,
            body:writeComment,
        }];
        let allpostsupdate = [...profilePost];
        let fetched = await fetch(`http://localhost:3004/posts/${(profilePost[index]).id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(obj),
        });
        let res = await fetched.json();
        allpostsupdate[index] = {...res};
        setWriteComment('');
        setshowAdd(!showAdd);
        dispatch(GetprofilePost([...allpostsupdate]));
    }
    return (
        <React.Fragment>
            {(((profilePost[index])!==undefined))?<div className='post mb-3 w-100 my-3' style={{color:"var(--main-color)",background:"var(--brand-background-div)"}} key={(profilePost[index]).id}>
                <div className='heade w-100' >
                    {(profilePost[index]!=='')?
                    <div className='w-100'>
                        <ProfilePostheader key={(profilePost[index]).id} index={index} post={{...(profilePost[index])}} userac={{...userac}}/>
                        <p className='post-body'>{(profilePost[index]).body}</p>
                        <div className='post-img mb-2'>
                            {((profilePost[index]).img!=="")?<img src={(profilePost[index]).img} alt="postimage"/>
                            :<React.Fragment></React.Fragment>}
                        </div>
                        <div className='w-100 mb-3 px-3 d-flex justify-content-between align-content-center'>
                        <div>
                        {(active===true)?
                            <i className="bi bi-heart-fill love me-2 active" onClick={()=>{
                                removeoldlove(user.id);
                            }}></i>:<i className="bi bi-heart-fill love me-2" onClick={()=>{
                                addnewlove(user.id);
                            }}></i>
                        }
                        <span>{([...((profilePost[index]).loves)].includes(user.id))?`You and ${([...((profilePost[index]).loves)].length)-1}`:[...((profilePost[index]).loves)].length}<span className='loves ms-1'>Loves</span></span></div>
                        <div className='curs' onClick={()=>{
                            setshowAdd(!showAdd);
                        }}>Add comment</div>
                        <div className='curs' onClick={()=>{
                            setShowComment(!showComment);
                        }}>comments</div>
                    </div>
                    {
                        (showAdd===true)?<form onSubmit={(e)=>{
                            e.preventDefault();
                            addnewComment();
                        }} className='w-100 pb-2 d-flex justify-content-center align-content-center flex-column'> 
                        <div className='w-100 d-flex justify-content-start align-content-center'>
                            <img className='imagcommet' src={user.img} alt="personal_imagea"/>
                            <input value={writeComment} className='inputcomment' type={"text"} placeholder={"Add your comment"} onChange={(e)=>{
                                setWriteComment(e.target.value);
                            }}/>
                        </div>
                        <button type='submit' className='w-fit btn btn-primary mt-2' >Add Comment</button>
                        </form>:<React.Fragment></React.Fragment>
                    }
                    {
                        (showComment!==false)?<div className='w-100 d-flex justify-content-start align-content-start flex-column'>
                                {
                                    ((profilePost[index])["comments"]).map((el,indx)=>{;
                                        return <CreantCommentProfile key={indx} index={index} idofcom={indx}/>;
                                    })
                                }
                        </div>:<React.Fragment></React.Fragment>
                    }
                    </div>
                    :<div className='empty'></div>}
                </div>
            </div>:<React.Fragment></React.Fragment>}
        </React.Fragment>
    )
}
export default PostmakerProfile;

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GET , GetPost } from '../../contextApp';
import CreantComment from './CreantComment';
import Postheader from './Postheader';
function Postmaker({index}) {
    let user = useSelector(state=>state.user);
    let allposts = useSelector(state=>state.allPosts);
    let dispatch = useDispatch();
    let [active,setActive] = useState(([...(allposts[index].loves)].includes(user.id))?true:false);
    let [showComment,setShowComment] = useState(false);
    let [writeComment,setWriteComment] = useState("");
    let [showAdd,setshowAdd] = useState(false);
    const addnewlove = async()=>{
        let obj = {...(allposts[index])};
        obj["loves"]= [...(obj["loves"]),user.id];
        let allpostsupdate = [...allposts];
        let fetched = await fetch(`http://localhost:3004/posts/${(allposts[index]).id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(obj),
        });
        let res = await fetched.json();
        allpostsupdate[index] = {...res};
        setActive(!active);
        dispatch(GetPost([...allpostsupdate]));
    }
    const removeoldlove = async(newid)=>{
        let obj = {...(allposts[index])};
        let deltetel = obj["loves"];
        let allpostsupdate = [...allposts];
        let lovesfilters = (deltetel).filter((el)=>{
            return el !== user.id;
        })
        obj["loves"] = [...lovesfilters];
        let fetched = await fetch(`http://localhost:3004/posts/${(allposts[index]).id}`,{
            method:"PUt",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(obj),
        });
        let res = await fetched.json();;
        allpostsupdate[index] = {...obj};
        setActive(!active);
        dispatch(GetPost([...allpostsupdate]));
    }
    const addnewComment = async()=>{
        let obj = {...(allposts[index])};
        obj["comments"]= [...(obj["comments"]),{
            userId:user.id,
            body:writeComment,
        }];
        let allpostsupdate = [...allposts];
        let fetched = await fetch(`http://localhost:3004/posts/${(allposts[index]).id}`,{
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
        dispatch(GetPost([...allpostsupdate]));
    }
    return (
        <React.Fragment>
                <div className='post mb-3 w-100' style={{color:"var(--main-color)",background:"var(--brand-background-div)"}} key={(allposts[index]).id}>
                <div className='heade w-100'>
                        <div className='w-100'>
                            <Postheader userId={(allposts[index]).userId} />
                            <p className='post-body'>{(allposts[index]).body}</p>
                            <div className='post-img mb-2'>
                                {((allposts[index]).img!=="")?<img src={(allposts[index]).img} alt="post image"/>
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
                                <span>{([...((allposts[index]).loves)].includes(user.id))?`You and ${([...((allposts[index]).loves)].length)-1}`:[...((allposts[index]).loves)].length}<span className='loves ms-1'>Loves</span></span></div>
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
                                            ((allposts[index])["comments"]).map((el,indx)=>{;
                                                return <CreantComment key={indx} index={index} idofcom={indx}/>;
                                            })
                                        }
                                </div>:<React.Fragment></React.Fragment>
                            }
                        </div>
                </div>
                </div>
        </React.Fragment>
    )
}
export default Postmaker;

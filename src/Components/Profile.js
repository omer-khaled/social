import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProfilePosts from './Profile/ProfilePosts';
import {GET, GetprofilePost} from '../contextApp'
import RSidebarProfile from './Profile/RSidebarProfile';
function Profile() {
    let {id} = useParams();
    let dispatch = useDispatch();
    let user = useSelector(state=>state.user);
    let [userProfile,setUserprofile] = useState('');
    let [foraccept,setforaccept] = useState([...(user["foraccept"])]);
    let [watinglis,setWating] = useState([...(user["watingList"])]);
    let [actualFreinds,setactualFreinds] = useState([...(user["actualFreinds"])]);
    let [open,Setopen] = useState(false);
    useEffect(()=>{
        if(Number(user.id)!==Number(id)){
            getUser();
        }else{
            setUserprofile(user);
        }
    },[])
    const getUser = async()=>{
        let feted = await fetch(`http://localhost:3004/users/${id}`);
        let data = await feted.json();
        setUserprofile({...data});
    }
    const Addcover = async(url)=>{
        console.log();
        setUserprofile(user);
        let obj = {...user};
        obj.coverImg = `${url}`;
        let feted = await fetch(`http://localhost:3004/users/${user.id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(obj)
        });
        let data = await feted.json();
        setUserprofile({...data});
        // localStorage.setItem('user',JSON.stringify({...data}))
        dispatch(GET({...data}));
    }
    const AddtoFriend = async(newid)=>{
        let fetchedobj = await fetch(`http://localhost:3004/users/${newid}`);
        let res = await fetchedobj.json();
        let obj = {...res};
        obj['watingList'] = [...(obj['watingList']),user.id];
        let fetched = await fetch(`http://localhost:3004/users/${newid}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(obj),
        });
        let data = await fetched.json();
        let obj1 = {...user};
        obj1['foraccept'] = [...(obj1['foraccept']),newid];
        let fetched1 = await fetch(`http://localhost:3004/users/${user.id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(obj1),
        });
        let data1 = await fetched1.json();
        // localStorage.setItem('user',JSON.stringify({...data1}))
        dispatch(GET({...data1}));
        Setopen(true);
    }
    return (
        <React.Fragment>
                {(userProfile.id!==undefined)?      
                    <React.Fragment>
                        <section className='container w-100  pt-4 d-flex justify-content-center align-items-start'>
                            <div  className='w-100 d-flex justify-content-center align-items-center flex-column'>
                                <div style={{color:"var(--main-color)",background:"var(--brand-background-div)"}} className='po-relative radPro w-75 d-flex justify-content-center align-items-center flex-column'>
                                    <div className='cover-img'>
                                        {(userProfile.coverImg)!==""?<img src={userProfile.coverImg} alt="CoverImage" />:<div className='coverEmpty'></div>}
                                        {
                                            (userProfile.id===user.id)?<div className='cameraCover'>
                                                <input type={'file'}  onChange={(e)=>{
                                                    let file = e.target.files[0];
                                                    let fr = new FileReader();
                                                    fr.onload = ()=>{
                                                        Addcover(fr.result);
                                                    }
                                                    fr.readAsDataURL(file);
                                                }}/>
                                                <i className="bi bi-camera-fill"/>
                                            </div>:<React.Fragment></React.Fragment>
                                        }
                                    </div>
                                    <div className='acutal-img'>
                                        {(userProfile.img)!==""?<img src={userProfile.img} alt="acutalImage" />:<div className='acutalEmpty'></div>}
                                    </div>
                                </div>
                                <div style={{color:"var(--main-color)",background:"var(--brand-background-div)"}} className='po w-75 pt-5 ps-3 d-flex justify-content-between align-items-center'>
                                    <div className='w-50 d-flex justify-content-center align-items-start flex-column'>
                                        <h3>{`${userProfile.firstName} ${userProfile.lastName}`}</h3>
                                            <h4>{userProfile.Position}</h4>
                                            <p>{userProfile.Locatin}, {userProfile.Locatin}</p>
                                            <h5><span>{([...userProfile["actualFreinds"]]).length}</span> Friends</h5>
                                        </div>
                                        <div className='w-50 d-flex justify-content-end align-items-center pe-2'>
                                            {
                                                ((user.id!==userProfile.id)&&!(watinglis.includes(userProfile.id))&&!(foraccept.includes(userProfile.id))&&!(actualFreinds.includes(userProfile.id))&&open===false)?<i className="bi bi-person-plus-fill fs-5 pe-3 btnPro btnPro-edit" onClick={()=>{
                                                    AddtoFriend(userProfile.id);
                                                }}></i>:<React.Fragment></React.Fragment>
                                            }
                                        </div>
                                </div>
                                <ProfilePosts id={id} userac={userProfile} />
                            </div>
                            {(userProfile.id===user.id)?<RSidebarProfile />:<React.Fragment></React.Fragment>}
                        </section>
                    </React.Fragment>
                    :<div className='empty'></div>}
        </React.Fragment>
    )
}
// acutalUser={user}
export default Profile;
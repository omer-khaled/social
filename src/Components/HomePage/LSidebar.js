import React, { useEffect, useState } from 'react'
import {GET} from '../../contextApp'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
function LSidebar() {
    const user = useSelector(state=>state.user);
    const profiles = (useSelector(state=>state.user)).profiles;
    const dispatch = useDispatch();
    const [facebook,setFacebook] = useState("");
    const [linkdin,setlinkedin] = useState("");
    const [twiiter,settwiiter] = useState("");
    const [open,setOpen] = useState('');
    const updatelinks = async()=>{
        let profilesLinks = profiles;
        let filnalResult = [
            {
                "name": "Facebook",
                "link": (facebook!=="") ? facebook : profilesLinks[0].link
            },
            {
                "name": "linkedin",
                "link": (linkdin!=="") ? linkdin: profilesLinks[1].link
            },
            {
                "name": "Twitter",
                "link": (twiiter!=="") ? twiiter: profilesLinks[2].link
            }
        ];
        let obj = {...user};
        obj.profiles = [...filnalResult];
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
        setOpen(true);
    }
    return (
        <>
            {(open===false)?<div className='profiles'>
                <form className='box-shadow w-50 p-3' onSubmit={(e)=>{
                    e.preventDefault();
                    updatelinks();
                }}>
                    <div className='hedder'>
                        <p>Profiles</p>
                        <i className="bi bi-x-square-fill" onClick={()=>{
                            setOpen(true);
                        }}></i>
                    </div>
                    <div className='control-anim'>
                        <input className='form-control mb-3' type={'url'} onChange={(e)=>{
                            setFacebook(e.target.value);
                        }}/>
                        <span>Facebook</span>
                    </div>
                    <div className='control-anim'>
                        <input className='form-control mb-3' type={'url'} onChange={(e)=>{
                            setlinkedin(e.target.value);
                        }}/>
                        <span>Linkedin</span>
                    </div>
                    <div className='control-anim'>
                        <input className='form-control mb-3' type={'url'} onChange={(e)=>{
                            settwiiter(e.target.value);
                        }}/>
                        <span>Twitter</span>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Add</button>
                </form>
            </div>:<React.Fragment></React.Fragment>}
            <aside style={{color:"var(--main-color)",background:"var(--brand-background-div)"}} className='lsidebar d-flex justify-content-center align-items-start flex-column'>
                <div className='d-flex justify-content-start align-items-center'>
                    <div className='avatar'>
                        <img src={user.img} alt='avatar'/>
                    </div>
                    <div className='info'>
                       <Link className='linkpro' to={`/social/${user.id}`}><p>{`${user.firstName} ${user.lastName}`}</p></Link>
                        <span>{user.Position}</span>
                    </div>
                </div>
                <div className='br'></div>
                <div className='d-flex justify-content-center ps-2 flex-column align-items-start'>
                        <p><i className="bi bi-geo-alt-fill pe-2"></i> {user.Locatin}</p>
                        <p><i className="bi bi-briefcase-fill pe-2"></i> {user.Position}</p>
                </div>
                <div className='br'></div>
                <div className='d-flex w-100 justify-content-center ps-2 flex-column align-items-start'>
                    <div className='her'>
                        <span className='text-primary fs-5 fw-500'>Social Profiles</span>
                        <i className="bi bi-pencil-fill" onClick={()=>{
                            setOpen(false);
                        }}></i>
                    </div>
                    {
                        ((profiles).length!==0)?
                            (profiles).map((el,index)=>{
                                return(
                                    <a key={index} className='linkouter' href={el.link}>
                                        <p><i className={`bi bi-${(el.name).toLowerCase()} pe-2`}></i>{el.name}</p>   
                                    </a>
                                )
                            })
                            :<div className='empty'></div>
                    }  
                </div>
            </aside>
        </>
    )
}
export default LSidebar;

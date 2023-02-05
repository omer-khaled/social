import React, {  useState } from 'react'
import {  useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {GET, GetPost} from '../../contextApp'
import {useDispatch} from 'react-redux'
function Navbar() {
    const lstyle = {
        color:"var(--brand-color)",
        fontSize:"30px",
    };
    const nstyle = {
        padding:"5px 20px",
        background:"var(--nav-bar)",
    }
    // let allposts = useSelector(state=>state.allPosts);
    // let profilposts = useSelector(state=>state.profilePost);
    // let dispatch = useDispatch();
    const [dark,setDark] = useState(false);
    let user = useSelector(state=>state.user);
    return (
        <header>
            <nav className='navbar navbar-expand-lg navbar-light ' style={nstyle}>
                <div className='container d-flex justify-content-between align-item-center w-100'>
                    <Link to='/social/Home' className='navbar-brand' >
                        <span style={{color:"var(--brand-color)",fontSize:"30px",fontWeight:"bold"}}>OMSocial</span>
                    </Link>
                    <div className='links  d-flex justify-content-center align-item-center'>
                        {(dark===false)?<i className="bi bi-moon-fill" onClick={(e)=>{
                            document.documentElement.style.cssText=`
                                --main-background : #000;
                                --main-color : #fff;
                                --nav-bar : #2a2a2a;
                                --brand-background-div:#2f2f2f;
                            `;
                            setDark(true);
                        }}/>:<i className="bi bi-brightness-high-fill" onClick={(e)=>{
                            document.documentElement.style.cssText=`
                                --main-background : #d9d9d9;
                                --main-color : #000;
                                --nav-bar : #f8f9fa;
                                --brand-background-div:#fff;
                            `;
                            setDark(false);
                        }}/>}
                        <div className='po-relative cus'>
                            <Link to={`/social/${user.id}`} className='navbar-brand' ><i className="bi bi-people-fill"> </i>
                                {
                                    ((user.watingList)!==undefined)?
                                        <div className='nofit'>
                                        <p>{(user.watingList).length}</p>
                                        </div>
                                    :<></>
                                }
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
export default Navbar;

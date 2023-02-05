import React from 'react'
import {Link, Outlet} from 'react-router-dom'
import { Routes,Route } from 'react-router-dom';
import Login from './LandingPage/Login';
import Signup from './LandingPage/Signup';
function Landing() {
    const lstyle = {
        color:"var(--brand-color)",
        fontSize:"30px",
    };
    const nstyle = {
        padding:"5px 20px",
    }
    return (
        <>
            <nav className='navbar navbar-expand-lg navbar-light bg-light' style={nstyle}>
                <div className='container d-flex justify-content-between align-item-center w-100'>
                    <Link to='/social/' className='navbar-brand' >
                        <span style={{color:"var(--brand-color)",fontSize:"30px",fontWeight:"bold"}}>Linkedin</span>
                        <i className="bi bi-linkedin" style={lstyle}></i>
                    </Link>
                    <div>
                        <Link className='btn btn-primary' style={{width:"fit-content"}} to='/social/login'>Login</Link>
                    </div>
                </div>
            </nav>
            <section className='landing flex-grow-1'>
                    <Outlet />
            </section>
        </>
    )
}
export default Landing;
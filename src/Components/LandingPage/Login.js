import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {GET,GetPost} from '../../contextApp';
function Login() {
    let [Email,setEmail] = useState("");
    let dispatch = useDispatch();
    let [password,setpassword] = useState("");
    let [users,setUsers] = useState("");
    let naviagte = useNavigate();
    const submitForm = async()=>{
        let user = users.find((el)=>{
            return ((el.Email===Email)&&(el.password===password));
        });
        if(user!=="undefined"){
            // let se = JSON.stringify({...user})
            // localStorage.setItem('user',se);
            dispatch(GET(user));
            naviagte('/Home');
        }
    }
    useEffect(()=>{
        getUsers();
    },[]);
    const getUsers = async()=>{
        let feted = await fetch('http://localhost:3004/users');
        let res = await feted.json();
        setUsers([...res]);
    }
    return (
            <div className='w-50 h-100 container d-flex justify-content-center align-items-center flex-grow-1'>
                <form className='box-shadow w-75 p-3' onSubmit={(e)=>{
                    e.preventDefault();
                        submitForm();
                }}>
                    <div  className='control-anim'>
                        <input className='form-control mb-3' type={'email'} onChange={(e)=>{
                            setEmail(e.target.value);
                        }}/>
                        <span>Email</span>
                    </div>
                    <div className='control-anim'>
                        <input className='form-control mb-3' type={'password'} onChange={(e)=>{
                            setpassword(e.target.value);
                        }}/>
                        <span>Password</span>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
    )
}
export default Login;

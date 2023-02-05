import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {
    let [file,setFile] = useState("");
    let [FirstName,setFirstName] = useState("");
    let [LastName,setLastName] = useState("");
    let [pirthday,setpirthday] = useState("");
    let [Locatin,setLocatin] = useState("");
    let [Position,setPosition] = useState("");
    let [Email,setEmail] = useState("");
    let [password,setpassword] = useState("");
    let navigatorr = useNavigate();
    useEffect(()=>{
        getLocation();
    },[])
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
        function showPosition(position) {
            getstreet(position.coords.latitude,position.coords.longitude);
        }
    }
    const getstreet = /*async*/(latitude,longitude)=>{
        // const link = `http://api.positionstack.com/v1/reverse?access_key=2547d478af44e585cb97336c133b7f14&query=${latitude},${longitude}`;
        // let fetched = await fetch(link);
        // let res = await fetched.json();
        // if(({...(res.data[0])}.region)!==undefined){
            // setLocatin(`${{...(res.data[0])}.region} , ${{...(res.data[0])}.country_code}`);     
        // }else{
            setLocatin('Cairo , Egy');
        // } 
    }
    const submitForm = async()=>{
        let obj = {
            "firstName":FirstName,
            "lastName":LastName,
            "Locatin":Locatin,
            "Position":Position,
            "coverImg":"",
            "img":file,
            "pirthday":pirthday,
            "Email":Email,
            "password":password,
            "friends":[],
            "profiles":[
                {
                    "name": "Facebook",
                    "link": ""
                },
                {
                    "name": "linkedin",
                    "link": ""
                },
                {
                    "name": "Twitter",
                    "link": ""
                }
            ],
            "watingList":[],
            "foraccept":[],
            "actualFreinds":[],
        }
        let feted = await fetch('http://localhost:3004/users',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(obj)
        });
        let data = await feted.json();
        navigatorr('./login');
    }
    return (
            <div className='w-100 h-100 container d-flex justify-content-center align-items-center flex-grow-1'>
                <form className='box-shadow w-75 p-3' onSubmit={(e)=>{
                    e.preventDefault();
                        submitForm();
                }}>
                    <div className='d-flex justify-content-between align-items-center mb-3'>
                        <div className='control-anim me-4 w-50'>
                            <input className='form-control w-100' type={'text'} onChange={(e)=>{
                                setFirstName(e.target.value);
                            }}/>
                            <span>FirstName</span>
                        </div>
                        <div className='control-anim  w-50'>
                            <input className='form-control w-100' type={'text'} onChange={(e)=>{
                                setLastName(e.target.value);
                            }}/>
                            <span>LastName</span>
                        </div>
                    </div>
                    <div className='control-anim'>
                        <input className='form-control mb-3' type={'text'} onChange={(e)=>{
                            setPosition(e.target.value);
                        }}/>
                        <span>Position</span>
                    </div>
                    <div className='control-anim'>
                        <input className='form-control mb-3' type={'date'} onChange={(e)=>{
                            setpirthday(e.target.value);
                        }}/>
                        <span>PirthDay</span>
                    </div>
                    <div className='mb-3 bo'>
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
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
            </div>
    )
}
export default Signup;

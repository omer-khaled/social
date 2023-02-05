import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {GET} from '../../contextApp';
function CreateActualFriend({id}) {
    let [friend,setFriend] = useState({});
    let user = useSelector(state=>state.user);
    let actualFreinds = user.actualFreinds;
    useEffect(()=>{
        getUser();
    },[]);
    const getUser = async()=>{
        let feted = await fetch(`http://localhost:3004/users/${id}`);
        let res = await feted.json();
        setFriend({...res});
    }
    let dispatch = useDispatch();
    const removenewFriend = async(newid)=>{
        let fetc = await fetch(`http://localhost:3004/users/${newid}`);
        let data = await fetc.json();
        let obj1 = {...data};
        let newactualFreinds1 = (obj1["actualFreinds"]).filter((el)=>{
            return (el!==(user.id));
        })
        obj1.actualFreinds = [...newactualFreinds1];
        let fetched1 = await fetch(`http://localhost:3004/users/${newid}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(obj1),
        });
        let res1 = await fetched1.json();
        let newactualFreinds = actualFreinds.filter((el)=>{
            return (el!=newid);
        })
        let obj = {...user};
        obj.actualFreinds = [...newactualFreinds];
        let fetched = await fetch(`http://localhost:3004/users/${user.id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(obj),
        });
        let res = await fetched.json();
        //localStorage.setItem('user',JSON.stringify({...res}))
        dispatch(GET({...res}));
    }
    return (
        <React.Fragment>
            {(friend.firstName!==undefined)?<div key={id} className='d-flex justify-content-between w-100 align-items-start mb-2'>
                <div className='d-flex justify-content-start align-items-center'>
                    <div className='custom-avatar'>
                            <img src={friend.img} alt='avatar'/>
                    </div>
                    <div className='info'>
                        <p>{`${friend.firstName} ${friend.lastName}`}</p>
                        <span>{friend.Locatin}</span>
                    </div>
                    </div>
                    <i className="bi bi-x-lg add-person" onClick={()=>{
                                removenewFriend(Number(friend.id));
                    }}></i>
            </div>:<React.Fragment></React.Fragment>}
        </React.Fragment>
    )
}

export default CreateActualFriend;
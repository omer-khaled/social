import React, { useState ,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {GET} from '../../contextApp';
function CreateFrinedProfile({id}) {
    let [friend,setFriend] = useState({});
    let user = useSelector(state=>state.user);
    let watingList = user.watingList;
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
        let newwatingList = watingList.filter((el)=>{
            return (el!=newid);
        })
        let obj = {...user};
        obj.watingList = [...newwatingList];
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
    const acceptremovenewFriend = async(newid)=>{
        let fe = await fetch(`http://localhost:3004/users/${newid}`);
        let data = await fe.json();
        let obj1 = {...data};
        let newforaccept = ([...(obj1["foraccept"])]).filter((el)=>{
            return el!==user.id;
        })
        obj1["foraccept"] = [...newforaccept];
        let fetched1 = await fetch(`http://localhost:3004/users/${newid}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(obj1),
        });
        let res1 = await fetched1.json();
        let newwatingList = watingList.filter((el)=>{
            return (el!=newid);
        });
        let obj = {...user};
        obj.watingList = [...newwatingList];
        obj.actualFreinds = [...(obj.actualFreinds),newid];
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
        acceptremoveinFriend(newid);
    }
    const acceptremoveinFriend =  async(newid)=>{
        let fetchedobj = await fetch(`http://localhost:3004/users/${newid}`);
        let res = await fetchedobj.json();
        let obj = {...res};
        obj.actualFreinds = [...(obj.actualFreinds),user.id];
        let fetched = await fetch(`http://localhost:3004/users/${newid}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(obj),
        });
        let data = await fetched.json();
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
                    <i className="bi bi-check-lg add-person" onClick={()=>{
                            acceptremovenewFriend(Number(friend.id));
                    }}></i>
                    <i className="bi bi-x-lg add-person" onClick={()=>{
                                removenewFriend(Number(friend.id));
                    }}></i>
            </div>:<React.Fragment></React.Fragment>}
        </React.Fragment>
    )
}

export default CreateFrinedProfile;
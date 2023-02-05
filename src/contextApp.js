import { legacy_createStore , combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
let reducer = (state = {},action)=>{
    switch (action.type){
        case "get":
            return {...(action.payload)};
        default:
            return state;
    }
}
let reducerPosts = (state = [],action)=>{
    switch (action.type){
        case "getposts":
            return [...(action.payload)];
        default:
            return state;
    }
}
let reducerprofilePost = (state = [],action)=>{
    switch (action.type){
        case "getprofileposts":
            return [...(action.payload)];
        default:
            return state;
    }
}
let reducerCombin = combineReducers({
    user:reducer,
    allPosts:reducerPosts,
    profilePost:reducerprofilePost
});
const store = legacy_createStore(reducerCombin,applyMiddleware(thunk));

let GET = (user)=>{
    return{
        type:"get",
        payload:user
    }
}
let GetPost = (posts)=>{
    return{
        type:"getposts",
        payload:posts
    }
}
let GetprofilePost = (posts)=>{
    return{
        type:"getprofileposts",
        payload:posts
    }
}


export {GET,store,GetPost,GetprofilePost};
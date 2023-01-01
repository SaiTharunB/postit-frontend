const initialState = {
    username : null,
    token : null,
    isLoggedIn : false
}

export default function authreducer(state=initialState,action)
{
    const {type,payload} = action
    switch(type){
        case "SET_USER_DETAILS":
            return {...state,username:payload.username,token:payload.token,isLoggedIn:payload.isLoggedIn}
        case "RESER_USER_DETAILS":
            return {...state,username:null,token:null,isLoggedIn:false}
        default:
            return state
    }
}
export const setuserdetails = (value) => async dispatch =>{
    dispatch({
        type:"SET_USER_DETAILS",
        payload:value
    })
}
export const resetuserdetails = () => async dispatch =>{
    dispatch({
        type:"RESET_USER_DETAILS",
    })
}

export const setshowerror = (value) => async dispatch =>{
    dispatch({
        type:"SETSHOWERROR",
        payload:value
    })
}
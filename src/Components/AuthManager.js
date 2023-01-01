export const saveUser = (value) =>{
    sessionStorage.setItem("userDetails",JSON.stringify(value))
}

export const isLoggedIn = () =>{
    if (sessionStorage.getItem("userDetails")!==null)
        return true
    return false
}
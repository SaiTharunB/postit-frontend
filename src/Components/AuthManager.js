export const saveUser = (value) =>{
    sessionStorage.setItem("userDetails",JSON.stringify(value))
}

export const isLoggedIn = () =>{
    // if (sessionStorage.getItem("userDetails")!==null)
    //     return true
    // return false
    return true
}

export const getUserDetails = () => {
    if(isLoggedIn()){
        // return JSON.parse(sessionStorage.getItem("userDetails"))
        return {
            username:"user1",
            token:"24c9e15e52afc47c225b757e7bee1f9d"
        }
    }
}
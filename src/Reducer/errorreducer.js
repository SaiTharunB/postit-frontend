const initialState = {
    show_error:false
}

export default function errorreducer(state=initialState,action){
    const {type,payload} = action
    switch(type){
        case "SETSHOWERROR":
            console.log("setting showerror",payload)
            return {...state,show_error:payload}
        default:
            return state
    }
}
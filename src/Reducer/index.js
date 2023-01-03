import {combineReducers} from "redux";
// import authreducer from "./authreducer";
import errorreducer from "./errorreducer"

const reducer = combineReducers({
    // authreducer : authreducer,
    errorreducer:errorreducer
})

export default reducer;
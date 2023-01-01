import {combineReducers} from "redux";
import authreducer from "./authreducer";

const reducer = combineReducers({
    authreducer : authreducer
})

export default reducer;
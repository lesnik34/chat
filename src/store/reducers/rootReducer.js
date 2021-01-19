import {combineReducers} from 'redux'
import profileReducer from "./profile";
import userReducer from "./users";
import messagesReducer from "./messages";

export default combineReducers({
    profile: profileReducer,
    users: userReducer,
    messages: messagesReducer
})
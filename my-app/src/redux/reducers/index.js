import { combineReducers } from 'redux'
import session from './session'
import userProfile from './userProfile'
export default combineReducers({
    session,userProfile
})
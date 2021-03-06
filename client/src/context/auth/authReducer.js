import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    AUTH_ERROR,
    CLEAR_ERRORS
} from '../types'

export default (state, action) => {
    switch(action.type){
        case USER_LOADED:
            return{
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            //console.log(localStorage.getItem('token'))
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }

        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS: 
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}
import React, {useReducer} from 'react'
import axios from 'axios'
import AuthReducer from './authReducer'
import AuthContext from './authContext'
import setAuthToken from '../../utils/setAuthToken'

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

const AuthState = props =>{
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: null,
        error: null,
        user: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState)

    // Load User
    const loadUser = async () =>{
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }
        try{
            const res = await axios.get('/api/auth')
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        }catch(err){
            dispatch({type: AUTH_ERROR, payload: err.response.data})
        }
        
    }

    // Register User
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json',

            }
        }
        try {
            const response = await axios.post("/api/users", formData, config)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            })
            loadUser()
        } catch (error) {
            console.log(error.response.data);
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg
            })
        }
    }

    // Login User
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        try {
            const response = await axios.post("/api/auth", formData, config)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            })
            loadUser()
        } catch (error) {
            console.log(error.response.data);
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.msg
            })
        }
    }

    // Logout
    const logout = () =>{
        dispatch({type: LOGOUT})
    }

    // clear errors
    const clearErrors = () => dispatch({type: CLEAR_ERRORS})

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            error: state.error,
            user: state.user,
            register,
            clearErrors,
            loadUser,
            login,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
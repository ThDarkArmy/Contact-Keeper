import React, {useReducer} from 'react'
import axios from 'axios'
import ContactReducer from './contactReducer'
import ContactContext from './contactContext'

import {
    ADD_CONTACT,
    GET_CONTACTS,
    CLEAR_CONTACTS,
    DELETE_CONTACT,
    CLEAR_CURRENT,
    CLEAR_FILTER,
    FILTER_CONTACTS,
    SET_CURRENT,
    UPDATE_CONTACT,
    CONTACT_ERROR
} from '../types'

const ContactState = props =>{
    const initialState = {
        contacts: null,
        current: null,
        filtered: null
    }

    const [state, dispatch] = useReducer(ContactReducer, initialState)

    // Get Contacts
    const getContacts = async () => {
        try{
            const res = await axios.get('/api/contacts')
            console.log(res.data)
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            })
            
        }catch(err){
            console.log("err.response")
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
                
            })
        }   
    }
    

    // add contact
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try{
            const res = await axios.post('/api/contacts', contact, config)
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            })
        }catch(err){
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.data.msg
            })
        }   
    }
    
    // delete contact
    const deleteContact = async id => {
        try{
            await axios.delete(`/api/contacts/${id}`)
            console.log("deleted")
            dispatch({
                type: DELETE_CONTACT,
                payload : id
            })
            
        }catch(err){
            console.log(err.response)
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
                
            })
        }   
        
    }

    // update contacts
    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try{
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            })
        }catch(err){
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.data.msg
            })
        }   
    }

    // clear contacts
    const clearContacts = () => {
        dispatch({
            type: CLEAR_CONTACTS
        })
    }

    // set current
    const setCurrent = contact => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        })
    }

    // clear current
    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        })
    }

    

     // update contacts
     const filterContacts = text => {
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        })
    }
    
    //clear filter
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        })
    }
   
    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,            
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            getContacts,
            clearContacts
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState
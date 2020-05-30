import React, {useReducer} from 'react'
import {v4} from 'uuid'
import ContactReducer from './contactReducer'
import ContactContext from './contactContext'

import {
    ADD_CONTACT,
    CLEAR_CONTACTS,
    DELETE_CONTACT,
    CLEAR_CURRENT,
    CLEAR_FILTER,
    FILTER_CONTACTS,
    SET_CURRENT,
    UPDATE_CONTACT
} from '../types'

const ContactState = props =>{
    const initialState = {
        contacts: [
            {
                "id": 1,
                "name": "mukesh Ambani",
                "email": "mukesh@gmail.com",
                "phone": "54567890",
                "type": "professional"
            },
            {
                "id": 2,
                "name": "anant Ambani",
                "email": "anant@gmail.com",
                "phone": 64567890,
                "type": "personal"
            },
            {
                "id": 3,
                "name": "anil Ambani",
                "email": "anil@gmail.com",
                "phone": 34567890,
                "type": "professional"
            }
        ],
        current: null,
        filtered: null
    }

    const [state, dispatch] = useReducer(ContactReducer, initialState)

    // add contact
    const addContact = contact => {
        contact.id = v4()
        dispatch({
            type: ADD_CONTACT,
            payload: contact
        })
    }
    
    // delete contact
    const deleteContact = id => {
        dispatch({
            type: DELETE_CONTACT,
            payload : id
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
    const updateContact = contact => {
        dispatch({
            type: UPDATE_CONTACT,
            payload: contact
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
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState
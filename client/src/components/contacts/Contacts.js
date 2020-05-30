import React, {Fragment, useContext} from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem'


const Contacts = () => {
    const contactContext = useContext(ContactContext)
    const { contacts, filtered } = contactContext

    if(contacts.length===0){
        return <h3>Please enter some contacts.</h3>
    }
    return (
        <Fragment>
            <TransitionGroup>
                {filtered!==null? filtered.map(contact =>
                <CSSTransition key = {contact.id} timeout={500} classNames='enter'>
                    <ContactItem contact={contact}/>
                </CSSTransition>
                ) :
                    contacts.map(contact => 
                    <CSSTransition key = {contact.id} timeout={500} classNames='enter'>
                        <ContactItem contact={contact}/>
                    </CSSTransition>
                    )
                }
            </TransitionGroup>
        </Fragment>
    )
}

export default Contacts

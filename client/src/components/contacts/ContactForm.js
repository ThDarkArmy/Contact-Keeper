import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'


const ContactForm = () => {
    const contactContext = useContext(ContactContext)
    const {addContact, updateContact, clearCurrent, current} = contactContext

    useEffect(() => {
        if(current!=null){
            setContact(current)
        }else{
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
    }, [contactContext, current])

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    })

    const {name, email, phone, type} = contact

    const onChange = e => setContact({...contact, [e.target.name] : e.target.value})

    const onSubmit = e => {
        e.preventDefault()

        if(!current){
            addContact(contact)
        }else{
            updateContact(contact)
        }
        
        clearAll()
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        })
    }

    const clearAll = () => {
        clearCurrent()
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'>{current ? 'Edit Contact':'Add Contact'}</h2>
            <input 
                type='text'
                placeholder='Name'
                value={name}
                name='name'
                onChange={onChange}/>
            <input 
                type='text'
                placeholder='Email'
                value={email}
                name='email'
                onChange={onChange}/>
            <input 
                type='text'
                placeholder='Phone'
                value={phone}
                name='phone'
                onChange={onChange}/>
            <h5>Contact Type</h5>
            <input type='radio' value='personal' name='type' checked={type==='personal'} onChange={onChange}/>Personal{'  '}
            <input type='radio' value='professional' name='type' checked={type==='professional'} onChange={onChange} />Professional
            <div>
                <input type='submit' value={current ? 'Update Contact':'Add Contact'} className='btn btn-primary btn-block'/>
            </div>
            {current && <div>
                <button className="bt btn-light btn-block" onClick={clearAll}>Clear</button>
                </div>}
        </form>
    )
}

export default ContactForm

const express = require('express')
const router = express.Router()
const {check, validationResult}  = require('express-validator')
const auth = require('../middleware/auth')

const User = require('../models/User')
const Contact = require('../models/Contact')


// get all contacts
router.get('/', auth, async (req, res)=>{
    try{
        const contacts = await Contact.find({user: req.user.id}).sort({date: -1})
        res.status(200).json(contacts)
    }catch(err){
        console.log(err.message)
        res.status(500).send("Server Error")
    }
})

// add contact
// private route
router.post('/',auth, [
    check('name', 'Name is required').not().isEmpty()
], async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})
    const {name, email, phone, type} = req.body
    try{
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user:req.user.id
        })
        const contact = await newContact.save()
        res.status(201).json(contact)
    }catch(err){
        console.log(err.message)
        res.status(500).send("Server Error")
    }
    
})

router.put('/:id',auth, (req, res)=>{
    res.send("update contacts")
})

router.delete('/:id',auth, (req, res)=>{
    res.send('delete contacts')
})


module.exports = router
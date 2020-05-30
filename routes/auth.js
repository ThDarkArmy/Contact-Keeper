const express = require('express')
const router = express.Router()
const {check, validationResult}  = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const User = require('../models/User')

router.get('/',auth, async (req, res)=>{

    try{
        const user = await User.findById(req.user.id).select('-password')
        res.status(200).json(user)

    }catch(err){
        console.log(err.message)
        res.status(500).send("Server Error")
    }
})

router.post('/',[
    check('email', 'Please eneter a valid email.').isEmail(),
    check('password', 'Please enter the password.').exists()
],
 async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body
    
    try{
       
        let user = await User.findOne({email})
        if(!user) return res.status(400).json({msg: "User doesn't exists."})

        const isMatch = await bcrypt.compare(password, user.password) 
        if(!isMatch) return res.status(400).json({msg: "Invalid Password"})

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('SECRET'), {
            expiresIn: 36000
        }, (err, token)=>{
            if(err) throw err
            res.status(200).json({token})
        })

    }catch(err){
        console.log(err.message)
        res.status(400).json({error: err})
    }
})


module.exports = router
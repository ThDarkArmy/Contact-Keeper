const express = require('express')
const router = express.Router()
const {check, validationResult}  = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')

const User = require('../models/User')

router.get('/',auth, (req, res)=>{
    res.send(req.user)
})


router.post('/',[
    check('name', 'Please include name.').not().isEmpty(),
    check('email', 'Please include a valid email.').isEmail(),
    check('password', 'Please enter a password with 6 or more characters.').isLength({min: 6})
],
 async (req, res)=>{
     const errors = validationResult(req)
     if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array()})
     }

     const {email, name, password} = req.body
     try{
        let user  = await User.findOne({email})
        if(user) return res.status(500).json({msg: 'user already exists'})
        
        let hashPassword;
        user = new User({
            name,
            email,
            password
        })
        await bcrypt.hash(password, 8, (err, hash)=> {
            if(err) throw err
            user.password = hash
            user.save()
        });
        

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtsecret'), {
            expiresIn: 360000
        }, (err, token)=>{
            if(err) throw err
            res.status(200).json({token})
        })

       
     }catch(err){
        console.log(err.message)
        res.status(500).json({error: err.message})
     }
})


module.exports = router
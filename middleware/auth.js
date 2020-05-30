const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    const token = req.header('x-auth-token')
    console.log(token)

    if(!token)
        return res.status(400).json("No token, authorization denied")

    try{
        const decoded = jwt.verify(token, config.get('SECRET'))
        req.user = decoded.user
        console.log(req.user)
        next()
    }catch(err){
        res.status(401).json({msg: "Invalid Token", error: err})
    }
}
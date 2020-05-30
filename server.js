const express = require('express')

const users = require('./routes/users')
const contacts = require('./routes/contacts')
const auth = require('./routes/auth')

// connect to database
require('./config/db')()

const app = express()

// middlewares
app.use(express.json({extended: false}))


const PORT = process.env.PORT | 5000

app.get('/', (req, res)=>{
    res.status(200).json({msg: "Welcome to the contact-keeper api."})
})

// Define routes
app.use('/api/users', users)
app.use('/api/contacts', contacts)
app.use('/api/auth', auth)


app.listen(PORT, ()=> console.log("Server is running on port: "+ PORT))
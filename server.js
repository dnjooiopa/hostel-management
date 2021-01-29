const express = require('express')
require('dotenv').config()

const authenticationRoute = require('./routes/authentication-route')
const customerRoute = require('./routes/customer-route')

const app = express()

app.use(express.json())

app.use('/api', authenticationRoute)
app.use('/api', customerRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`)
})
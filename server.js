const express = require('express')
require('dotenv').config()

const authenticationRoute = require('./routes/authentication-route')
const customerRoute = require('./routes/customer-route')
const hotelRoute = require('./routes/hotel-route')
const roomTypeRoute = require('./routes/room-type-route')
const roomRoute = require('./routes/room-route')
const bookingRoute = require('./routes/booking-route')

const app = express()

app.use(express.json())

app.use('/api', authenticationRoute)
app.use('/api', customerRoute)
app.use('/api', hotelRoute)
app.use('/api', roomTypeRoute)
app.use('/api', roomRoute)
app.use('/api', bookingRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`)
})
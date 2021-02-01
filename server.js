const express = require('express')
const path = require('path')
require('dotenv').config()

const authenticationRoute = require('./routes/authentication-route')
const customerRoute = require('./routes/customer-route')
const hotelRoute = require('./routes/hotel-route')
const roomRoute = require('./routes/room-route')
const bookingRoute = require('./routes/booking-route')

const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, 'client/build')))

app.use('/api', authenticationRoute)
app.use('/api', customerRoute)
app.use('/api', hotelRoute)
app.use('/api', roomRoute)
app.use('/api', bookingRoute)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})
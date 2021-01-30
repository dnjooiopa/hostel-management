const { getBookings } = require('../controllers/booking-controller')
const { verifyToken } = require('../middlewares/verify-token')

const router = require('express').Router()

router.get('/bookings', verifyToken, getBookings)

module.exports = router
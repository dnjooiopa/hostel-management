const { getBookings, createBooking } = require('../controllers/booking-controller')
const { verifyToken } = require('../middlewares/verify-token')

const router = require('express').Router()

router.get('/bookings', verifyToken, getBookings)
router.post('/bookings', verifyToken, createBooking)

module.exports = router
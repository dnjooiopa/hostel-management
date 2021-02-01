const { getBookings, createBooking, deleteBooking } = require('../controllers/booking-controller')
const { verifyToken } = require('../middlewares/verify-token')

const router = require('express').Router()

router.get('/bookings', verifyToken, getBookings)
router.post('/bookings', verifyToken, createBooking)
router.delete('/bookings', verifyToken, deleteBooking)

module.exports = router
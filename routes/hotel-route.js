const { searchHotel, getHotelData } = require('../controllers/hotel-controller')

const router = require('express').Router()

router.get('/hotels', searchHotel)
router.get('/hotels/:hotel_id', getHotelData)

module.exports = router
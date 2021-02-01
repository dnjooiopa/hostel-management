const { searchHotel, getHotelData, insertHotel } = require('../controllers/hotel-controller')

const router = require('express').Router()

router.get('/hotels', searchHotel)
router.get('/hotels/:hotel_id', getHotelData)
router.post('/hotels', insertHotel)

module.exports = router
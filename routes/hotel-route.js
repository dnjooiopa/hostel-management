const { searchHotel } = require('../controllers/hotel-controller')

const router = require('express').Router()

router.get('/hotels', searchHotel)

module.exports = router
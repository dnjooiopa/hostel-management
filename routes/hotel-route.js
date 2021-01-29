const { searchHotel } = require('../controllers/hotel-controllers')

const router = require('express').Router()

router.get('/hotels', searchHotel)


module.exports = router
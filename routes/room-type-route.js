const { getRoomTypes } = require('../controllers/room-type-controller')

const router = require('express').Router()

router.get('/room-types', getRoomTypes)

module.exports = router
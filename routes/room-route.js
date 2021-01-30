const { getRooms } = require('../controllers/room-controller')

const router = require('express').Router()

router.get('/rooms', getRooms)

module.exports = router
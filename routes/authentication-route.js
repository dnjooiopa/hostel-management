const { registerCustomer, logInCustomer } = require('../controllers/authentication-controller')

const router = require('express').Router()

router.post('/register', registerCustomer)
router.post('/login', logInCustomer)

module.exports = router
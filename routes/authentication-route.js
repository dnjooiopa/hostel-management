const { registerCustomer, signInCustomer } = require('../controllers/authentication-controller')

const router = require('express').Router()

router.post('/register', registerCustomer)
router.post('/signin', signInCustomer)

module.exports = router
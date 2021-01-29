const { signUpCustomer } = require('../controllers/authentication-controller')

const router = require('express').Router()

router.post('/signup', signUpCustomer)

module.exports = router
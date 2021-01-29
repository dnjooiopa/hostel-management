const { signUpCustomer, signInCustomer } = require('../controllers/authentication-controller')

const router = require('express').Router()

router.post('/signup', signUpCustomer)
router.post('/signin', signInCustomer)

module.exports = router
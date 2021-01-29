const { getCustomerData } = require('../controllers/customer-controller')
const { verifyToken } = require('../middlewares/verify-token')

const router = require('express').Router()

router.get('/customers', verifyToken, getCustomerData)

module.exports = router
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { errorMessage, status } = require('../helpers/status')

const verifyToken = async (req, res, next) => {
    const { token } = req.headers
    if (!token) {
        errorMessage.error = 'Token not provided'
        return res.status(status.bad).send(errorMessage)
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = {
            customer_id: decoded.customer_id
        }
        next()
    } catch (error) {
        errorMessage.error = 'Authentication Failed'
        return res.status(status.unauthorized).send(errorMessage)
    }
}

module.exports = {
    verifyToken

} 
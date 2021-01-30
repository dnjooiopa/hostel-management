const db = require('../db')

const { status, successMessage, errorMessage } = require('../helpers/status')
const { isEmpty } = require('../helpers/validation')

const getBookings = async (req, res) => {
    const { customer_id } = req.user

    if (isEmpty(customer_id)) {
        errorMessage.error = 'Customer id cannot be empty'
        res.status(status.bad).send(errorMessage)
    }

    const getBookingsQuery = `
    SELECT * from booking
    WHERE customer_id = $1
    `
    const values = [customer_id]

    try {
        const {rows} = await db.query(getBookingsQuery, values)
        const dbResults = rows
        successMessage.data = dbResults
        return res.status(status.success).send(successMessage)
    } catch (error) {
        errorMessage.error = 'Operation was not successful'
        return res.status(status.error).send(errorMessage)
    }
}

module.exports = {
    getBookings
}
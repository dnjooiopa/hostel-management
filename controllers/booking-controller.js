const db = require('../db')

const { status, successMessage, errorMessage } = require('../helpers/status')
const { isEmpty, generateID } = require('../helpers/validation')

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
        const { rows } = await db.query(getBookingsQuery, values)
        const dbResults = rows
        successMessage.data = dbResults
        return res.status(status.success).send(successMessage)
    } catch (error) {
        errorMessage.error = 'Operation was not successful'
        return res.status(status.error).send(errorMessage)
    }
}

const createBooking = async (req, res) => {
    const { customer_id } = req.user
    const { hotel_id, room_id, check_in_date, check_out_date, booking_date, no_guest} = req.body

    if (isEmpty(customer_id) || isEmpty(hotel_id) || isEmpty(check_in_date) || isEmpty(check_in_date) || isEmpty(check_out_date)) {
        errorMessage.error = 'Fields cannot be empty'
        return res.status(status.bad).send(errorMessage)
    }

    const createBookingQuery = `
    INSERT INTO booking
    (booking_id, hotel_id, room_id, customer_id, check_in_date, check_out_date, booking_date, no_guest)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
    `
    const booking_id = generateID()
    const values = [booking_id, hotel_id, room_id, customer_id, check_in_date, check_out_date, booking_date, no_guest]
    try {
        const { rows } = await db.query(createBookingQuery, values)
        const dbResult = rows[0]
        successMessage.data = dbResult
        return res.status(status.success).send(successMessage)
    } catch (error) {
        errorMessage.error = 'Operation was not successful'
        return res.status(status.error).send(errorMessage)
    }
}


module.exports = {
    getBookings,
    createBooking
}
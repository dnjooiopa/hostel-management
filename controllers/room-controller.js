const db = require('../db')

const { status, successMessage, errorMessage } = require('../helpers/status')
const { isEmpty } = require('../helpers/validation')

const getRooms = async (req, res) => {
    const { hotel_id } = req.query

    if (isEmpty(hotel_id)) {
        errorMessage.error = 'Please provide hotel_id'
        res.status(status.bad).send(errorMessage)
    }

    const getRoomQuery = `
    SELECT * FROM room
    WHERE hotel_id = $1
    `
    const values = [hotel_id]

    try {
        const { rows } = await db.query(getRoomQuery, values)
        const dbResults = rows
        successMessage.data = dbResults
        return res.status(status.success).send(successMessage)
    } catch (error) {
        errorMessage.error = 'Operation was not successful'
        return res.status(status.error).send(errorMessage)
    }
}

module.exports = {
    getRooms
}
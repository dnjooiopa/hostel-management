const db = require('../db')

const { status, successMessage, errorMessage } = require('../helpers/status')
const { isEmpty } = require('../helpers/validation')

const getRooms = async (req, res) => {
    const { type_id } = req.query

    if (isEmpty(type_id)) {
        errorMessage.error = 'Type id cannot be empty'
        res.status(status.bad).send(errorMessage)
    }

    const getRoomQuery = `
    SELECT * FROM room
    WHERE type_id = $1
    `
    const values = [type_id]

    try {
        const { rows } = await db.query(getRoomQuery, values)
        const dbResults = rows
        if (dbResults.length == 0) {
            errorMessage.error = 'This room type has no room'
            return res.status(status.notfound).send(errorMessage)
        }

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
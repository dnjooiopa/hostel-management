const db = require('../db')
const { status, successMessage, errorMessage } = require('../helpers/status')
const { isEmpty } = require('../helpers/validation')

const getRoomTypes = async (req, res) => {
    const { hotel_id } = req.query

    if(isEmpty(hotel_id)){
        errorMessage.error = 'Hotel id cannot be empty'
        res.status(status.bad).send(errorMessage)
    }

    const getRoomTypeQuery = `
    SELECT * FROM room_type
    WHERE hotel_id = $1
    `
    const values = [hotel_id]

    try {
        const { rows } = await db.query(getRoomTypeQuery, values)
        const dbResults = rows
        if(dbResults.length == 0)
        {   
            errorMessage.error = 'This hotel has no room'
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
    getRoomTypes
}
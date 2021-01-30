const db = require('../db')

const { isEmpty } = require('../helpers/validation')
const { status, successMessage, errorMessage } = require('../helpers/status')

const searchHotel = async (req, res) => {

    const search_text = req.query.search_text
    const limit = req.query.limit || 5

    const searchQuery = `
    SELECT * FROM hotel
    ${search_text ? `WHERE document @@ to_tsquery('${search_text.split(' ').join('|')}')` : ''}
    LIMIT ${limit}
    `

    try {
        const { rows } = await db.query(searchQuery)
        dbResults = rows.map(row => {
            delete row.document
            return row
        })
        successMessage.data = dbResults
        return res.status(status.success).send(successMessage)
    } catch (error) {
        errorMessage.error = 'Operation was not successful'
        return res.status(status.error).send(errorMessage)
    }
}

const getHotelData = async (req, res) => {
    const { hotel_id } = req.params

    if (isEmpty(hotel_id)) {
        errorMessage.error = 'hotel_id cannot be empty'
        return res.status(status.bad).send(errorMessage)
    }

    const getHotelQuery = `
    SELECT * FROM hotel
    WHERE hotel_id=$1
    `
    const values = [hotel_id]

    try {
        const { rows } = await db.query(getHotelQuery, values)
        const dbResult = rows[0]
        if (!dbResult) {
            errorMessage.error = 'This hotel does not exist'
            return res.status(status.notfound).send(errorMessage)
        }
        delete dbResult.document
        successMessage.data = dbResult
        return res.status(status.success).send(successMessage)
    } catch (error) {
        errorMessage.error = 'Operation was not successful'
        return res.status(status.error).send(errorMessage)
    }

}

module.exports = {
    searchHotel,
    getHotelData
}
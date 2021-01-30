const db = require('../db')

const { status, successMessage, errorMessage } = require('../helpers/status')

const searchHotel = async (req, res) => {

    const search_text = req.query.search_text
    const limit = req.query.limit || 5

    const searchQuery = `
    SELECT * FROM hotel
    ${search_text ? `WHERE document @@ to_tsquery('${search_text.split(' ').join('|')}')` : ''}
    LIMIT ${limit}
    `
    console.log(searchQuery)

    try {
        const { rows } = await db.query(searchQuery)
        dbResults = rows.map(row => {
            delete row.document
            return row
        })
        successMessage.data = dbResults
        return res.status(status.success).send(successMessage)
    } catch (err) {
        console.log(err)
        errorMessage.error = 'Operation was not successful'
        return res.status(status.error).send(errorMessage)
    }
}

module.exports = {
    searchHotel
}
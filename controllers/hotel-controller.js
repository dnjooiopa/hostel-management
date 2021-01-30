const db = require('../db')

const { status, successMessage, errorMessage } = require('../helpers/status')
const { isEmpty } = require('../helpers/validation')

const searchHotel = async (req, res) => {

    const { search_text } = req.query

    if (isEmpty(search_text)) {
        errorMessage.error = 'Please provide search text'
        return res.status(status.bad).send(errorMessage)
    }

    const searchQuery = `
    SELECT * FROM hotel
    WHERE document @@ to_tsquery($1)
    `
    const values = [search_text.split(' ').join('|')]
    
    try {
        const { rows } = await db.query(searchQuery, [values])
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
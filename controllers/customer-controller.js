const db = require('../db')

const { status, errorMessage, successMessage } = require('../helpers/status')

const getCustomerData = async (req, res) => {
    const { customer_id } = req.user

    const getUserDetailQuery = `
    SELECT * FROM customer
    WHERE customer_id = $1
    `
    const values = [customer_id]

    try {
        const { rows } = await db.query(getUserDetailQuery, values)
        const dbResult = rows[0]
        if (!dbResult) {
            errorMessage.error = 'This customer does not exist'
            return res.status(status.notfound).send(errorMessage)
        }
        delete dbResult.password
        successMessage.data = dbResult
        return res.status(status.success).send(successMessage)
    } catch (error) {
        errorMessage.error = 'Operation was not successful'
        return res.status(status.error).send(errorMessage)
    }
}


module.exports = {
    getCustomerData
}
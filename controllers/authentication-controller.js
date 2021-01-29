const db = require('../db')

const { generateID } = require('../helpers/validation')
const { hashPassword, isEmpty, validateEmail, validatePassword } = require('../helpers/validation')
const { successMessage, errorMessage, status } = require('../helpers/status')

const signUpCustomer = async (req, res) => {
    const { username, email, first_name, last_name, birth_date, phone, password } = req.body

    if (isEmpty(username) || isEmpty(email) || isEmpty(first_name) || isEmpty(email) || isEmpty(last_name) || isEmpty(birth_date) || isEmpty(phone)) {
        errorMessage.error = 'Email, username, password, first name, last name, phone and birth_date field cannot be empty'
        return res.status(status.bad).send(errorMessage)
    }

    if (!validateEmail(email)) {
        errorMessage.error = 'Please enter a valid email'
        return res.status(status.bad).send(errorMessage)
    }

    if (!validatePassword(password)) {
        errorMessage.error = 'Password must be more than 6 characters'
        return res.status(status.bad).send(errorMessage)
    }

    const hashedPassword = hashPassword(password)
    const createCustomerQuery = `
        INSERT INTO customer
        (customer_id, first_name, last_name, birth_date, phone, email, username, password)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        returning *`
    const values = [
        generateID(),
        first_name,
        last_name,
        birth_date,
        phone,
        email,
        username,
        hashedPassword
    ]

    try {
        const { rows } = await db.query(createCustomerQuery, values)
        successMessage.data = rows[0]
        delete successMessage.data.password
        return res.status(status.created).send(successMessage)
    } catch (error) {
        console.log(error)
        if (error.routine === '_bt_check_unique') {
            errorMessage.error = 'Username and email already exist'
            return res.status(status.conflict).send(errorMessage)
        }
        errorMessage.error = 'Operation was not successful'
        return res.status(status.error).send(errorMessage)
    }
}

module.exports = {
    signUpCustomer
}
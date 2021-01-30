const db = require('../db')

const { generateID } = require('../helpers/validation')
const { hashPassword, isEmpty, validateEmail, validatePassword, comparePassword, generateUserToken } = require('../helpers/validation')
const { successMessage, errorMessage, status } = require('../helpers/status')

const registerCustomer = async (req, res) => {
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
    const registerCustomerQuery = `
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
        const { rows } = await db.query(registerCustomerQuery, values)
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

const logInCustomer = async (req, res) => {
    const { username, password } = req.body

    if (isEmpty(username) || isEmpty(password)) {
        errorMessage.error = 'Email and username cannot be empty'
        return res.status(status.bad).send(errorMessage)
    }

    if (!validatePassword(password)) {
        errorMessage.error = 'Password must be more than 6 characters'
        return res.status(status.bad).send(errorMessage)
    }

    const logInCustomerQuery = `
    SELECT * FROM customer 
    WHERE username = $1
    `
    const values = [username]

    try {
        const { rows } = await db.query(logInCustomerQuery, values)
        const dbResult = rows[0]
        if (!dbResult) {
            errorMessage.error = 'This username does not exist'
            return res.status(status.notfound).send(errorMessage)
        }

        if (!comparePassword(dbResult.password, password)) {
            errorMessage.error = 'Invalid password'
            return res.status(status.bad).send(errorMessage)
        }
        const token = generateUserToken(dbResult.customer_id)
        delete dbResult.password
        successMessage.data = dbResult
        successMessage.data.token = token
        return res.status(status.success).send(successMessage)

    } catch (error) {
        console.log(error)
        errorMessage.error = 'Operation was not successful'
        return res.status(status.error).send(errorMessage)
    }
}

module.exports = {
    registerCustomer,
    logInCustomer
}
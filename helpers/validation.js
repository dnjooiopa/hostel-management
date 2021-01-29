const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const hashPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

const comparePassword = (hashedPassword, password) => {
    return bcrypt.compareSync(password, hashedPassword)
}

const generateUserToken = (user_id) => {
    const token = jwt.sign({
        user_id
    },
        process.env.SECRET_KEY, { expiresIn: '7d' })
    return token
}

const generateID = () => {
    return uuidv4()
}

const validateEmail = email => {
    const regEx = /\S+@\S+\.\S+/
    return regEx.test(email)
}

const validatePassword = (password) => {
    if (password.length <= 6 || password === '') {
        return false
    } return true
}

const isEmpty = input => {
    if (input === undefined || input === null || input === '') {
        return true
    }
    if (input.replace(/\s/g, '').length) {
        return false
    } return true
}

module.exports = {
    hashPassword,
    comparePassword,
    generateUserToken,
    generateID,
    isEmpty,
    validateEmail,
    validatePassword
}
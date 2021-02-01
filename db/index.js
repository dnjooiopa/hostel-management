const { Pool } = require('pg')
require("dotenv").config()

const isProduction = process.env.NODE_ENV === 'production'

const pool = new Pool(
    isProduction ? { connectionString: process.env.DATABASE_URL, ssl: false } : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_NAME,
        port: process.env.DB_PORT,
    }
)

module.exports = {
    query: (text, params) => pool.query(text, params),
}
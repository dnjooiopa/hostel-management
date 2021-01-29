const { Pool } = require('pg')
require('dotenv').config()

const isProduction = process.env.NODE_ENV === 'production'

const pool = new Pool(
    isProduction ? { connectionString: process.env.DATABASE_URL } : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        idleTimeoutMillis: 2000
    }
)

module.exports = {
    query: (text, params) => pool.query(text, params),
}
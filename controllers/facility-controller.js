const db = require('../db')

const getFacility = async (hotel_id) => {
    const getFacilityQuery = `
    SELECT * from facility
    WHERE hotel_id = $1
    `
    const values = [hotel_id]

    try {
        const { rows } = await db.query(getFacilityQuery, values)
        const facility = rows[0]
        return facility
    } catch (error) {
        return false
    }
}

module.exports = getFacility
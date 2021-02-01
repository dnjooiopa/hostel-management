const db = require('../db')

const { isEmpty, generateID } = require('../helpers/validation')
const { status, successMessage, errorMessage } = require('../helpers/status')
const getFacility = require('./facility-controller')

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
        const hotels = []
        for (let hotel of rows) {
            const { rows: rooms } = await db.query(`SELECT * FROM room WHERE hotel_id=$1`, [hotel.hotel_id])
            delete hotel.document
            hotels.push({ ...hotel, rooms })
        }
        successMessage.data = hotels
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
        delete dbResult.document

        if (!dbResult) {
            errorMessage.error = 'This hotel does not exist'
            return res.status(status.notfound).send(errorMessage)
        }

        const facility = await getFacility(hotel_id)
        if (!facility) {
            errorMessage.error = 'Cannot get facility data'
            return res.status(status.notfound).send(errorMessage)
        }

        const { rows: rooms } = await db.query(`SELECT * FROM room WHERE hotel_id=$1`, [hotel_id])

        successMessage.data = { ...dbResult, facility, rooms }
        return res.status(status.success).send(successMessage)
    } catch (error) {
        errorMessage.error = 'Operation was not successful'
        return res.status(status.error).send(errorMessage)
    }
}

const insertHotel = async (req, res) => {
    const { name, detail, phone, city, latitude, longitude, facility, rooms } = req.body
    const insertHotelQuery = `
        INSERT INTO hotel
        (hotel_id, name, detail, phone, city, latitude, longitude, document)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, to_tsvector($8 || ' ' || $9 || ' ' || $10))
        RETURNING *
        `
    const hotel_id = generateID()
    const hotelValues = [hotel_id, name, detail, phone, city, latitude, longitude, name, detail, city]

    const { air_condition, restaurant, wifi, parking, swimming_pool, lift } = facility
    const insertFacilityQuery = `
        INSERT INTO facility
        (hotel_id,  air_condition, restaurant, wifi, parking, swimming_pool, lift )
        VALUES
        ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `
    const facilityValues = [hotel_id, air_condition, restaurant, wifi, parking, swimming_pool, lift]

    try {
        await db.query(insertHotelQuery, hotelValues)
        await db.query(insertFacilityQuery, facilityValues)

        for (let room of rooms) {
            const { room_type, max_guest, price } = room
            const insertRoomQuery = `
                INSERT INTO room
                (hotel_id, room_id, room_type, max_guest, price)
                VALUES
                ($1, $2, $3, $4, $5)
                RETURNING *
                `
            const values = [hotel_id, generateID(), room_type, max_guest, price]
            await db.query(insertRoomQuery, values)
        }

        successMessage.data = { hotel_id }
        return res.status(status.created).send(successMessage)
    } catch (err) {
        errorMessage.error = 'Operation was not successful'
        return res.status(status.error).send(errorMessage)
    }
}

module.exports = {
    searchHotel,
    getHotelData,
    insertHotel
}
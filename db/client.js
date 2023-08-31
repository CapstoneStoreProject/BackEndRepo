// Connect to DB
const { Client } = require('pg')

// change the DB_NAME string to whatever your group decides on
const DB_NAME = 'acc-capstone'

const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`

const client = new Client(DB_URL)

// for deployment on Render.io you will need to create options in Client() for password, user, and host

module.exports = client

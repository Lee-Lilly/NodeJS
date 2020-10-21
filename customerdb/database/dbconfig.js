const { Pool } = require('pg')

//connect to database customer
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    database: "customer",
    password: "postgres"
})

// export method query
module.exports = {
    query: (text, params) => pool.query(text, params),
}
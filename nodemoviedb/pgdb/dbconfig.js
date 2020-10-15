// import node-postgres Pool module. 
const { Pool } = require('pg');

// create a new instance of the Pool module and define connection settings 
// get connection to our Postgres SQL database movie
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    database: "movie",
    password: "postgres"
});

// export our module with a method name 'query'
// query invokes node-postgres pool.query() function with parameters (text, params) 
// pool.query() can be used to execute SQL statements to the database
module.exports = {
    query: (text, params) => pool.query(text, params),
}


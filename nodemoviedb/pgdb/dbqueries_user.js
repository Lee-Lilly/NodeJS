const db = require('./dbconfig');

// Get user by email
// callback function "next" in the parameter. 
// allows us to call this function from the other javascript files
const getUserByEmail = (email, next) => {
    // user = {email, password}
    const query = {
        text: 'SELECT * FROM users WHERE email = $1',
        values: [email],
    }

    db.query(query, (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        else {
            next(result.rows);
        }
    })
}

module.exports = {
    getUserByEmail: getUserByEmail
}
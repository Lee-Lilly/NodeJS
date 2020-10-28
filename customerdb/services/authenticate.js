// import JWT library jsonwebtoken for creating and verifying token
const jwt = require('jsonwebtoken');
// import JWT library bcrypt for hashing the password
const bcrypt = require('bcrypt');

// import user.js
const user = require('../database/db_user');

//secret key provided
process.env.SECRET_KEY = "5b1a3923cc1e1e19523fd5c3f20b409509d3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84d";

// User login
// User can login to movie REST API by sending the POST request to /login endpoint.
// The request body should contain valid email and password
const login = (req, res) => {
    // Extract email and password from the request body
    const email = req.body.email;
    const password = req.body.password;

    // method "getUserByEmail" will verify if user exists in the database    
    const verifyUser = user.getUserByEmail(email, (user) => { //callback function with an array named "user"
        // known user email is unique, the first element is the target.
        if (user.length > 0) {
            // if user is found, hash the user input password
            const hashpwd = user[0].password;
            // generate a JSON Web Token
            // secret key for the jwt got from the environment parameter process.env.SECRET_KEY
            const token = jwt.sign({ userId: email }, process.env.SECRET_KEY);

            // If password match, send the token to request 'Authorization' header
            if (bcrypt.compareSync(password, hashpwd))
                res.send({ token });
            else
                res.sendStatus(400).end();
        }
        else
            res.sendStatus(400).end();
    });

}

// User authentication
const authenticate = (req, res, next) => {
    // extract the token from header using express header()
    const token = req.header('Authorization');

    // if no token 
    if (!token) {
        res.sendStatus(400).end();
    }

    // Verify the received token in the request header
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err)
            res.sendStatus(400).end();
        else
            next(); // call the function in another JavaScript file
    });
}

module.exports = {
    authenticate: authenticate,
    login: login
}
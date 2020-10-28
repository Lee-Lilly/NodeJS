const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 3000;

// use query methods exported from dbqueries
const query = require('./database/dbqueries');

// use authenticate and login methods from authenticate services
const auth = require('./services/authenticate');

// route for login
app.post("/login", auth.login);

// POSTMAN post request body: a User (email, password)
// response is an object ={token: ..}
// activate Authorization in request header 
// copy the token value into the value of Header 'Authorization' 

// route for REST API
// this goes through two call back functions : authenticate and next() = queries
// integrate the authenticate and queries into app express

app.get('/api/customers', auth.authenticate, query.getAllcustomers);

app.get('/api/customers/:id', auth.authenticate, query.getCustomerbyId);

app.post('/api/customers', auth.authenticate, query.addNewCustomer);

app.delete('/api/customers/:id', auth.authenticate, query.deleteCustomerbyId);

app.put('/api/customers/:id', auth.authenticate, query.updateCustomerbyId);

app.delete('/api/customers', auth.authenticate, query.deleteAllCustomers);

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

//export our express web server
module.exports = app;
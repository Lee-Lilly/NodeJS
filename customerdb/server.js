const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 3000;

// use query methods exported from dbqueries
const query = require('./database/dbqueries');

// integrate the queries into app express
app.get('/api/customers', query.getAllcustomers);

app.get('/api/customers/:id', query.getCustomerbyId);

app.post('/api/customers', query.addNewCustomer);

app.delete('/api/customers/:id', query.deleteCustomerbyId);

app.put('/api/customers/:id', query.updateCustomerbyId);

app.delete('/api/customers', query.deleteAllCustomers);

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

//export our express web server
module.exports = app;
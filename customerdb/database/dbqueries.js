// use dbconfig module and define queries to database
const db = require('./dbconfig');

//get all customers
const listCustomers = (req, res) => {
    // method query exported from dbconfig.js, takes two parameters
    // SQL statement 
    //a error-first callback function be executed immediately
    db.query('SELECT * FROM customers', (err, result) => {
        if (err)
            console.error(err);
        else
            //result.rows is an array of customers  
            res.json(result.rows);
    })
}

// Get customer by id
// use parameterized query, to avoid the risk of SQL Injection
// With node-postgres library, queries are defined as objects.
const searchCustomer = (req, res) => {  
    // Query object has attributes "text" and "values" 
    // "text" attribute contains a SQL statement 
    // "values" attribute contains query parameter values.
    // '$1' means the first element in the 'values' array 
    const search_query = {
        text: 'SELECT * FROM customers WHERE id = $1',
        values: [req.params.id]
    }

    db.query(search_query, (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        else {
            if (result.rows.length > 0)
                res.json(result.rows);
            else
                res.sendStatus(404); // Not found
        }
    })
}

// add new customer
const addCustomer = (req, res) => {
    // get customer object from the request body
    const newCustomer = req.body;

    // define query object, attribute "values" is an array, extracted from req.body
    const insert_query = {
        text: 'INSERT INTO customers (firstname, lastname, email, phone) VALUES ($1, $2, $3, $4)',
        values: [newCustomer.firstname, newCustomer.lastname, newCustomer.email, newCustomer.phone]
    }

    // insert to database
    db.query(insert_query, (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack);
        }
    })

    res.json(newCustomer);
}

//delete customer
const deleteCustomer = (req, res) => {
    // define query obj
    const delete_query = {
        text: 'DELETE FROM customers WHERE id = $1',
        values: [req.params.id]
    }

    // delete from table
    db.query(delete_query, (err, result) => {
        if (err)
            return console.error('Error executing query', err.stack);
    })

    res.sendStatus(204);
}

//update Customer
const updateCustomer = (req, res) => {
    //extract edited customer from the request body
    const editedCustomer = req.body;

    // update table, with extracted id from req.params and the updated values from req.boby 
    const update_query = {
        text: 'UPDATE customers SET firstname = $1, lastname = $2, email = $3, phone = $4 WHERE id = $5',
        values: [editedCustomer.firstname, editedCustomer.lastname, editedCustomer.email, editedCustomer.phone, req.params.id]
    }

    //update to database
    db.query(update_query, (err, result) => {
        if (err)
            return console.error('Error executing query', err.stack);
    })

    res.json(editedCustomer);
}

//export methods
module.exports = {
    getAllcustomers: listCustomers,
    getCustomerbyId: searchCustomer,
    addNewCustomer: addCustomer,
    deleteCustomerbyId: deleteCustomer,
    updateCustomerbyId: updateCustomer
}

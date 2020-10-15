const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 3000;

// use our db module and execute queries to movie database
const db = require('./pgdb/dbconfig');

//get all movies
app.get("/api/movies", (req, res) => {
    //exported method query exported from dbconfig.js
    // query takes two parameters, SQL query and a callback function execute immediately
    db.query('SELECT * FROM movies', (err, result) =>{
        if (err)
            console.error(err);
        else
        //result.rows is an array of movies  
            res.json(result.rows);
    })
});

// Get movie by id
//use parameterized query, because that avoids the risk of SQL injection
app.get("/api/movies/:id", (req, res) => {
    // With node-postgres library, we can define queries using object.
    // Query object contains text attribute that contains SQL statement 
    // and values attribute that contains query parameter values.
    // '$1' means the first element in the 'valuess' array 
    const search_by_id = {
        text: 'SELECT * FROM movies WHERE id = $1', 
        values: [req.params.id]
    }
    db.query(search_by_id, (err, result) =>{
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
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
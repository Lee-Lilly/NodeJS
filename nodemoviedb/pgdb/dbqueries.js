// use dbconfig module and execute queries to movie database
const db = require('./dbconfig');

//get all movies
const list_movies = (req, res) => {
    // method query exported from dbconfig.js, takes two parameters
    // SQL statement 
    //a error-first callback function be executed immediately
    db.query('SELECT * FROM movies', (err, result) => {
        if (err)
            console.error(err);
        else
            //result.rows is an array of movies  
            res.json(result.rows);
    })
}

// Get movie by id
//use parameterized query, to avoid the risk of SQL injection
const search_movie = (req, res) => {
    // With node-postgres library, we can define queries as an object.
    // Query object contains text attribute that is a SQL statement 
    // and values attribute that contains query parameter values.
    // '$1' means the first element in the 'valuess' array 
    const search_by_id = {
        text: 'SELECT * FROM movies WHERE id = $1',
        values: [req.params.id]
    }

    db.query(search_by_id, (err, result) => {
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

//export functions
module.exports = {
    getAllmovies: list_movies,
    getMoviebyId: search_movie
}

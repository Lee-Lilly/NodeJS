// use dbconfig module and execute queries to movie database
const db = require('./dbconfig');

//get all movies
const listMovies = (req, res) => {
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
const searchMovie = (req, res) => {
    // With node-postgres library, we can define queries as an object.
    // Query object contains text attribute that is a SQL statement 
    // and values attribute that contains query parameter values.
    // '$1' means the first element in the 'valuess' array 
    const search_query = {
        text: 'SELECT * FROM movies WHERE id = $1',
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

// add new movie
const addMovie = (req, res) => {
    //extra movie body from the request body
    const newMovie = req.body;

    //query object, values array gets from req.body
    const insert_query = {
        text: 'INSERT INTO movies (title, director, year) VALUES ($1, $2, $3)',
        values: [newMovie.title, newMovie.director, newMovie.year]
    }

    // insert to database
    db.query(insert_query, (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack);
        }
    })
    
    res.json(newMovie);
}

//delete movie
const deleteMovie = (req, res) => {
    // define query object
    const delete_query = {
        text: 'DELETE FROM movies WHERE id = $1',
        values: [req.params.id]
    }

    // delete from database
    db.query(delete_query, (err, result) => {
        if (err) 
            return console.error('Error executing query', err.stack);
        else
            res.sendStatus(204);
    })
   
}

//update movie
const updateMovie = (req, res) => {
    //extract edited movie from the request body
    const editedMovie = req.body;
    
    // define query object
    const update_query = {
        text: 'UPDATE movies SET title = $1, director = $2, year = $3 WHERE id = $4',
        values: [editedMovie.title, editedMovie.director, editedMovie.year, req.params.id]
    }

    //update to database
    db.query(update_query, (err, result) => {
        if(err)
            return console.error('Error executing query', err.stack);
    })

    res.json(editedMovie);
}

//export functions
module.exports = {
    getAllmovies: listMovies,
    getMoviebyId: searchMovie,
    addNewMovie: addMovie,
    deleteMoviebyId: deleteMovie,
    updateMoviebyId: updateMovie
}

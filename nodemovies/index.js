// import express
const express = require('express') ;
// initialize an express instance
const app = express();
// define port of listening
const port = 3000;
// attache webserver listener to port
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

// add some data to this web server
// 'id' is generated with Date.now()
const movies = [
    { id: '1588323375416', title: 'Star Wars: Episode IX - The Rise of Skywalker', year: 2019, director: 'J.J. Abrams' },
    { id: '1588323390624', title: 'The Irishman', year: 2019, director: 'Martin Scorsese' },
    { id: '1588323412643', title: 'Harry Potter and the Sorcerers Stone', year: 2001, director: 'Chris Columbus' }
];

// specify "endpoint", add GET method
app.get("/api/movies", (req, res) => {
    res.json(movies);
});

// implement GET {id} functionality, which can be used to search movie by id.
app.get("/api/movies/:id", (req, res) =>{
    // get target movieID from request parameter
    let movieID = req.params.id;
    
    // "filter" creates a new array
    // iterates through the array and invokes the argument function to all elements
    let movie = movies.filter(movie => movie.id === movieID);

    // specify the response
    if (movie.length > 0)
        res.json(movie);
    else
        res.sendStatus(404); //print out "Not Found" on browser.
});
// import express
const express = require('express') ;
// import body-parser
const bodyParser = require('body-parser');

// initialize an express instance
const app = express();

// let bodyParser to parse JSON, under the hook of express 
app.use(bodyParser.json());

// define port of listening
const port = 3000;

// add some data to this web server app
let movies = [
    { id: '1588323375416', title: 'Star Wars: Episode IX - The Rise of Skywalker', year: 2019, director: 'J.J. Abrams' },
    { id: '1588323390624', title: 'The Irishman', year: 2019, director: 'Martin Scorsese' },
    { id: '1588323412643', title: 'Harry Potter and the Sorcerers Stone', year: 2001, director: 'Chris Columbus' }
];

// specify "endpoint", add GET method
app.get("/api/movies", (req, res) => {
    res.json(movies);
});

// attache webserver event listener to port, interact with user requests
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

// implement searching movie by "id" with GET method.
app.get("/api/movies/:id", (req, res) =>{
    // get target movieID from request parameter
    const movieID = req.params.id;
    
    // "filter" creates a new array "movie"
    // iterates through the array and invokes the argument function to all elements
    const movie = movies.filter(movie => movie.id === movieID);

    // specify the response
    if (movie.length > 0)
        res.json(movie);
    else //print out "Not Found"
        res.sendStatus(404);
});

// implement adding new movie functionality with POST mthods 
app.post("/api/movies", (req, res) => {
    // extract a movie object from req.body specified in spread syntax
    // here we use POSTMAN body to get post request in json form
    // id is generated by Date.now() 
    const newMovie = {'id': Date.now(), ...req.body};

    // add newMovie object to the end of movies array
    movies = [...movies, newMovie]

    // specify response
    res.json(movies);
})

// implement update functionality using PUT('endpoint', (req, res) =>{...})
app.put("/api/movies/:id", (req, res) =>{
    // get target movieID from request parameter
    const id = req.params.id;
    // updated object from req.body
    const updatedMovie = {'id': id, ...req.body}; 

    // get the index of targeted movie in the array of movies
    const index = movies.findIndex(movie => movie.id === id);
    
    // replace updated movie in the array using splice
    // splice() method changes the contents of an array 
    // by removing or replacing existing elements and/or adding new elements in place.
    
    //replace 1 element at place of index
    movies.splice(index, 1, updatedMovie);

    //response of an object in JSON form
    res.json(updatedMovie);
})

// implement delete functionality using delete
app.delete("/api/movies/:id", (req, res) =>{
    const id = req.params.id;
    
    //keep those movie by id that is not identical to the parameter  
    movies = movies.filter(movie => movie.id !== id);
    res.sendStatus(204); //no content
})
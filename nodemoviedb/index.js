const express = require('express');
const bodyParser = require('body-parser');

// use methods exported from dbqueries
const query = require('./pgdb/dbqueries_movie');

// use authenticate and login methods from authenticate services
const auth = require('./services/authenticate');

const app = express();

app.use(bodyParser.json());

const port = 3000;

// route for login
app.post("/login", auth.login);

// POSTMAN post request body: a User (email, password)
// response is an object ={token: ..}
// activate Authorization in request header 
// copy the token value into the value of Header 'Authorization' 

// route for REST API
// this goes through two call back functions : authenticate and next  
app.get("/api/movies", auth.authenticate, query.getAllmovies);

// Get movie by id
app.get("/api/movies/:id", auth.authenticate, query.getMoviebyId);

//add new movie
app.post("/api/movies", auth.authenticate, query.addNewMovie);

//delete movie by id
app.delete("/api/movies/:id", auth.authenticate, query.deleteMoviebyId);

//update movie by id
app.put("/api/movies/:id", auth.authenticate, query.updateMoviebyId);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
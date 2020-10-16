const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 3000;

// use queries exported from dbqueries
const query = require('./pgdb/dbqueries');

//get all movies
app.get("/api/movies", query.getAllmovies);

// Get movie by id
app.get("/api/movies/:id", query.getMoviebyId)

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
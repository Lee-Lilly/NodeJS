const express = require('express');
const app = express();
const port = 3000;

//express app set the template engine, and NodeJS load up the pug module
app.set('view engine', 'pug');

//web app route end point '/hi' to render the hello.pug
//file name extension .pug is not obligated, set() function has specified template engine in use.
//pass value from app, corresponding to the variable in the pug file
app.get("/hi", (req, res) => {
    res.render("hello", {firstname: 'Susan', lastname: 'Canteberge'});
})

// A movie list
let movies = [
    { id: '1588323375416', title: 'Star Wars: Episode IX - The Rise of Skywalker', year: 2019, director: 'J.J. Abrams' },
    { id: '1588323390624', title: 'The Irishman', year: 2019, director: 'Martin Scorsese' },
    { id: '1588323412643', title: 'Harry Potter and the Sorcerers Stone', year: 2001, director: 'Chris Columbus' }
];

//app request to end point '/' and pass the array of movies to the pug file
app.get("/", (req, res) => {
    res.render("movielist", { movies: movies });
})

//include body parser to the app
const bodyParser = require('body-parser');

//express app uses body parser to enbale extraction of web form values 
app.use(bodyParser.urlencoded({ extended: true }));

//end point of "/addmovie" form
app.get("/addmovie", (req, res) => {
    res.render("addmovie");
})

//end point form submission by 'app.post', extract movie attributes from request body, 
//add new movie to the array of movies, use redirect to return end point "/"
app.post("/addmovie", (req, res) => {
    const newMovie = { id: new Date().now, title: req.body.title, director: req.body.director, year: req.body.year };
    movies = [...movies, newMovie];
    res.redirect("/");
})

app.listen(port, ()=>{
    console.log(`Server is runnning on port ${port}`);
})
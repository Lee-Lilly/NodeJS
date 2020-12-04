const express = require('express');
const app = express();
const port = 3000;

//express app set the template engine, and NodeJS load up the pug module
app.set('view engine', 'pug');

//A list of customers
const customers = [
    { id: '1588323375416', firstname: 'John', lastname: 'Johnson', email: 'john@johnson.com', phone: '8233243' },
    { id: '1588323375417', firstname: 'Mary', lastname: 'Smith', email: 'mary@smith.com', phone: '6654113' },
    { id: '1588323375418', firstname: 'Peter', lastname: 'North', email: 'peter@north.com', phone: '901176' },
]

//app request to end point '/' and pass the array of customers to the pug file
app.get("/", (req, res) => {
    res.render("customerlist", { customers: customers });
})

//include body parser to the app
const bodyParser = require('body-parser');

//express app uses body parser to enbale extraction of web form values 
app.use(bodyParser.urlencoded({ extended: true }));

//end point of "/addcustomer" form
app.get("/addcustomer", (req, res) => {
    res.render("addcustomer");
})

//end point form submission by 'app.post', extract customer attributes from request body, 
//add new movie to the array of customers, use redirect to return end point "/"
app.post("/addcustomer", (req, res) => {
    const newCustomer = { id: new Date().now, firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, phone:req.body.phone };
    movies = [...customers, newCustomer];
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Server is runnning on port ${port}`);
})
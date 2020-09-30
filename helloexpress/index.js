const express = require('express');

//initiate an node express instance
const app = express();

const port = 3000;

// app.get("/", (req, res) => {
//     //GET request is done to root endpoint of our app('/')
//     // returns Hello Express text in the response
//     res.send("Hello Express!");
// })

/* app.all("/hello", (req, res) => {
    // ALL = {GET, POST, PUT, DELETE} requests received at "/hello" end point 
    // returns Hello Express text in the response
    res.send("Hello Express Run Nodemon!");
}) */

app.get("/home/:firstname/:lastname", (req, res) => {
    // requests is received at "/home" end point 
    // returns Welcome text in the response
    res.send(`Welcome ${req.params.firstname}  ${req.params.lastname}`);
})

app.get("/about", (req, res) => {
    // request is received at "/about" end point 
    // returns About text in the response
    res.send("About us ....");
})
app.listen(port, () =>{
    console.log(`Server is running on port ${port}.`);
})
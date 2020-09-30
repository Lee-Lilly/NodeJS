const express = require('express');

//initiate an node express instance
const app = express();

const port = 3000;

// app.get("/", (req, res) => {
//     //GET request is done to root endpoint of our app('/')
//     // returns Hello Express text in the response
//     res.send("Hello Express!");
// })

app.all("/hello", (req, res) => {
    //ALL = {GET, POST, PUT, DELETE} requests in received at "/hello" end point 
    // returns Hello Express text in the response
    res.send("Hello Express!");
})

app.listen(port, () =>{
    console.log(`Server is running on port ${port}.`);
})
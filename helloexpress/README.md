The first try of express framework

Procedure:
1. create a new folder, initiate the project
    > mkdir helloexpress
    > cd helloexpress
    > npm init
2. install express dependencies 
    > npm install express 
3. import module express using require('express)
    const express = require('express');
4. initiate an instance of node express.
    const app = express();
5. define port.
    const port = 3000;
6. GET request is done to root endpoint of the express instance ('/') 
    app.get("/", (Request Listener Function));
6. Request Listener Function (RLF) takes two parameters: request & response, res.send() method sends the HTTP response
    (req, res) => {
        res.send("Hello Express!);
    }
7. app.listen(port, ()=>{...}); 
8. add "start": "node index.js" to "Scripts" in package.json, to specif the start script
9. go terminal, type "npm start", it will execute "node index.js" 


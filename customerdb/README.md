**Customers Database**

App is initialized with **Node.js and Express**

Installed packages **body-parser** and **pg for PostgreSQL**

Created entry file **server.js** with **port listener** and **http entry point**

Connect to database
-   created a sub folder /database
-   created and edited dbconfig.js (specify postgreSQL connection and query pool)
-   created and edited dbqueries.js (import dbconfig, define queries to postgres db)
-   integrate the queries into index.js (import dbqueries, execute express GET, POST, PUT, DELETE with callback queries)
-   export dbqueries as web service for testing purpose

Installed test libraries:
-   npm install --save-dev mocha chai chai-http

Add test script into package.json
 -  "test": "mocha"
 
Created test_customer.js
 -  import test libraries
 -  using chai-http plugin with the chai library:  chai.use(chaihttp);
 -  pass the app (our web service) to the chai.request(app)
 -  use should() assertion function from chai library: const should = chai.should();
 -  given a test object
 -  create test cases (DELETE ALL, POST, GET)



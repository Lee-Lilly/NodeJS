**Customers Database**

App is initialized with **Node.js and Express**

Installed packages **body-parser** and **pg for PostgreSQL**

Created entry file **index.js** with **port listener** and **http entry point**

Connect to database
-   created a sub folder /database
-   created and edited dbconfig.js (specify postgreSQL connection and query pool)
-   created and edited dbqueries.js (import dbconfig, define queries to postgres db)
-   integrate the queries into index.js (import dbqueries, execute express GET, POST, PUT, DELETE with callback queries)


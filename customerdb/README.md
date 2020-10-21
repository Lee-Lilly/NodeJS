**Customers Database**

App is initialized with **Node.js and Express**

Installed packages **body-parser** and **pg for PostgreSQL**

Created entry file **index.js** with **port listener** and **http entry point**

Added **MIT Licence** on gitLab (git pull)

Created and edited **Dockerfile** 

-   use "node:alpine" image from Docker Hub
-   COPY package.json .
-   RUN "npm install" in container
-   COPY . .
-   commande line CMD ["npm", "start"]
-   add WORKDIR /code (before COPY)

>   docker build . --tag me:latest (build the app)

>   docker run -p 3000:3000 me:latest 

>   docker run -it me:latest sh (log into container)

>   mkdir code (create a sub folder /code as WORKDIR for Dockerfile)

Connect to database
-   created a sub folder /database
-   created and edited dbconfig.js (specify postgreSQL connection and query pool)
-   created and edited dbqueries.js (import dbconfig, define queries to postgres db)
-   integrate the queries into index.js (import dbqueries, execute express GET, POST, PUT, DELETE with callback queries)


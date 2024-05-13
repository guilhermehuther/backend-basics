# backend-basics

This github is part of a medium article that aims to contribue with the kwonledge of a small portion of the back-end development: RESTful API in node.js with a Postgres Database.

## API URLs

docs

```
http://localhost:80/docs
```

users endpoint

```
http://localhost:80/api/users
```

## For running the Postgres Database Docker container

```
docker run --name postgresdb -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=postgres -d postgres
```

## For installing the packages needed (after copying the package.json from the repo) and running the server

```
npm i
npm start
```

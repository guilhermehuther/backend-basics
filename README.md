# backend-basics

## For running the postgres database docker container

```
docker run --name postgresdb -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=postgres -d postgres
```

## For running installing the packages needed (after copying the package.json from the repo)

```
 npm i
```

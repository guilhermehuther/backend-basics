# FastAPI backend-basics

This follows the same structure of the ["main"](https://medium.com/@guilhermehuther/back-end-basics-e9a2ed1f244a) backend-basics. Try making analogies about the other.

The main features of this implementation using Python and it's libraries are: [FastAPI](https://fastapi.tiangolo.com/) for the Restful Api "engine" and [psycopg](https://www.psycopg.org/psycopg3/docs/index.html) for connecting into the database.

Recently the [frontend](./front/) part was developed with [Next](https://nextjs.org/).

## Backend

### 1. Setup

#### 1.1. Create a python [venv](https://docs.python.org/3/library/venv.html)

```sh
python3 -m venv venv
```

#### 1.2. "Activate it" (only linux)

```sh
source venv/bin/activate
```

#### 1.3. Install dependecies

```sh
pip install -r requirements.txt
```

#### 1.4. Start database (docker)

```sh
cd docker

docker compose up -d
```

#### 1.5. Run server

```sh
cd back

python -m uvicorn main:app --reload
```

### 2. Usage

#### 2.1. Docs

```
http://localhost:8000/docs
```

#### 2.2. Users

```
http://localhost:8000/api/users
```

## Frontend

### 1. Setup

#### 1.1. Download Dependencies

Also [node.js](https://nodejs.org/) is required.

```sh
npm i
```

#### 1.2. Run

```
npm run dev
```

#### 1.3. Usage

[backend](#backend) must be running.

```sh
http://localhost:3000
```
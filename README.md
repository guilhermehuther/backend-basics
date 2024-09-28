# FastAPI backend-basics

This follows the same structure of the ["main"](https://medium.com/@guilhermehuther/back-end-basics-e9a2ed1f244a) backend-basics. Try making analogies about the other.

The main features of this implementation using Python and it's libraries are: [FastAPI](https://fastapi.tiangolo.com/) for the Restful Api "engine" and [psycopg](https://www.psycopg.org/psycopg3/docs/index.html) for connecting into the database.

# Setup

1. Create a python [venv](https://docs.python.org/3/library/venv.html)

    ```sh
    python3 -m venv venv
    ```

2. "Activate it" (only linux)

    ```sh
    source venv/bin/activate
    ```

3. Install dependecies

    ```sh
    pip install -r requirements.txt
    ```

4. Start database (docker)

    ```sh
    cd docker

    docker compose up -d
    ```

5. Run server

    ```sh
    cd app

    fastapi dev main.py
    ```

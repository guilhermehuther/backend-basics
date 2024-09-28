import psycopg
import os

POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres"
POSTGRES_DB="postgres"
POSTGRES_HOST="localhost"
POSTGRES_PORT=5432

async def pg(
    sql: str,
    is_one: bool = False
):
    async with await psycopg.AsyncConnection.connect(
        f"dbname={POSTGRES_DB} user={POSTGRES_USER} password={POSTGRES_PASSWORD} host={POSTGRES_HOST} port={POSTGRES_PORT}"
    ) as aconn:
        async with aconn.cursor() as cur:
            await cur.execute(sql)
            
            if is_one:
                return cur.rowcount
            else:
                return await cur.fetchall()
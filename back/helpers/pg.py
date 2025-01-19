import psycopg

POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres"
POSTGRES_DB="postgres"
POSTGRES_HOST="localhost"
POSTGRES_PORT=5432

def pg(sql: str):
    data = list()

    with psycopg.connect(
        f"""
        dbname={POSTGRES_DB}
        user={POSTGRES_USER}
        password={POSTGRES_PASSWORD} 
        host={POSTGRES_HOST} 
        port={POSTGRES_PORT}
        """,
        row_factory=psycopg.rows.dict_row
    ) as conn:
        with conn.cursor() as cur:
            cur.execute(sql)

            try:
                data = cur.fetchall()
                conn.commit()
            except Exception:
                data = cur.fetchone()
                conn.commit()
            finally:
                return data
    return data
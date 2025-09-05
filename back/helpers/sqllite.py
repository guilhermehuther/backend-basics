import sqlite3
import os

SQLITE_DB_PATH = os.path.join(os.path.dirname(__file__), "local.db")

def query(
    sql: str,
    params: list = []
) -> list:
    with sqlite3.connect(SQLITE_DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()

        try:
            cur.execute(sql, params)

            try:
                rows = cur.fetchall()
                data = [dict(row) for row in rows]
            except sqlite3.ProgrammingError:
                data = {"rowcount": cur.rowcount}

            conn.commit()
            
            return data
        except Exception as e:
            conn.rollback()
            raise e

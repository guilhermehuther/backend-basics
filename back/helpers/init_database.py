import sqlite3
import os
from datetime import datetime, timedelta
import random

SQLITE_DB_PATH = os.path.join(os.path.dirname(__file__), "local.db")

def init_db():
    if os.path.exists(SQLITE_DB_PATH):
        print(f"{SQLITE_DB_PATH} already exists. Skipping initialization.")
        return

    conn = sqlite3.connect(SQLITE_DB_PATH)
    cur = conn.cursor()

    cur.execute("""
    CREATE TABLE users (
        id_users            INTEGER PRIMARY KEY AUTOINCREMENT,
        password_users      TEXT NOT NULL,
        name_users          TEXT NOT NULL,
        email_users         TEXT NOT NULL,
        created_at_users    DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    """)

    users = []
    for i in range(1, 101):
        password = os.urandom(16).hex()
        name = f"User{i}"
        email = f"user{i}@example.com"
        days_ago = random.randint(0, 364)
        created_at = (datetime.now() - timedelta(days=days_ago)).strftime("%Y-%m-%d %H:%M:%S")
        users.append((password, name, email, created_at))

    cur.executemany(
        """
        INSERT INTO users (password_users, name_users, email_users, created_at_users)
        VALUES (?, ?, ?, ?)
        """, users
    )

    conn.commit()
    conn.close()

    print(f"Initialized {SQLITE_DB_PATH} with users table and 100 users.")

if __name__ == "__main__":
    init_db()

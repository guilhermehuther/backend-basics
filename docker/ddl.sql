CREATE EXTENSION pgcrypto;

CREATE TABLE users (
    id_users            VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
    password_users      VARCHAR(255) NOT NULL,
    name_users          VARCHAR(255) NOT NULL,
    email_users         VARCHAR(255) NOT NULL,
    created_at_users    TIMESTAMP DEFAULT NOW()
);

INSERT INTO public.users (id_users, password_users, name_users, email_users, created_at_users)
SELECT
  gen_random_uuid(),
  md5(random()::text),
  'User' || i,
  'user' || i || '@example.com',
  now() - (random() * interval '365 days')
FROM generate_series(1, 100) AS s(i);

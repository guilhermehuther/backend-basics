CREATE EXTENSION pgcrypto;

CREATE TABLE users (
    id_users                VARCHAR(36)     PRIMARY KEY DEFAULT gen_random_uuid(),
    cpf_users               VARCHAR(11)     NOT NULL CHECK (cpf_users ~ '^[0-9]+$') UNIQUE,
    email_users             VARCHAR(50)     NOT NULL CHECK (position('@' in email_users) > 0) UNIQUE,
    nome_users              VARCHAR(125)    NOT NULL,
    senha_users             VARCHAR(255)    NOT NULL,
    data_users              TIMESTAMP       NOT NULL DEFAULT NOW()
);
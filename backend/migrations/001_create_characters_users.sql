CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    ch_name VARCHAR(200) NOT NULL,
    background TEXT,
    inventory TEXT,
    strenght INTEGER,
    emotion INTEGER,
    mind INTEGER,
    icon VARCHAR(200),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    creator_id INTEGER NOT NULL DEFAULT 1 REFERENCES users(id)

);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()

);
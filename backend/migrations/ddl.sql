CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()

);

CREATE TABLE music_history(
    id_history  SERIAL PRIMARY KEY,
    id_user INTEGER NOT NULL,
    id_music INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

     CONSTRAINT fk_id_user
        FOREIGN KEY (id_user)
        REFERENCES users(id)

);

CREATE TABLE music(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    duration_seconds INTEGER NOT NULL,
    id_album INTEGER NOT NULL,
    genre VARCHAR(100),
    id_artist INTEGER NOT NULL,
    cover VARCHAR(200),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE search_history(
    id  SERIAL PRIMARY KEY,
    search_query VARCHAR(200),
    results VARCHAR(200),
    id_user INTEGER,

 CONSTRAINT fk_search_user
        FOREIGN KEY (id_user)
        REFERENCES users(id)

);

CREATE TABLE artist(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    bio TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE album(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    id_artist INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

     CONSTRAINT fk_id_artist
        FOREIGN KEY (id_artist)
        REFERENCES artist(id)

);

CREATE TABLE users_favorites(
    id_user INTEGER NOT NULL,
    id_music INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    PRIMARY KEY(id_user, id_music),
    
    CONSTRAINT fk_fav_user FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_fav_music FOREIGN KEY (id_music) REFERENCES music(id) ON DELETE CASCADE


);
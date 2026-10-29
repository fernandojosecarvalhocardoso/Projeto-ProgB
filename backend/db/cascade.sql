-- Rode DEPOIS do ddl.sql e do dml.sql (ou em um banco já existente).
-- users_favorites já tinha ON DELETE CASCADE; aqui ajustamos o restante.
BEGIN;

-- Apagar usuário -> apaga histórico de músicas e de buscas
ALTER TABLE music_history  DROP CONSTRAINT IF EXISTS fk_id_user;
ALTER TABLE music_history  ADD  CONSTRAINT fk_id_user
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE search_history DROP CONSTRAINT IF EXISTS fk_search_user;
ALTER TABLE search_history ADD  CONSTRAINT fk_search_user
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE;

-- Apagar música -> apaga entradas no histórico (e favoritos, que já cascateavam)
ALTER TABLE music_history  DROP CONSTRAINT IF EXISTS fk_id_music;
ALTER TABLE music_history  ADD  CONSTRAINT fk_id_music
    FOREIGN KEY (id_music) REFERENCES music(id) ON DELETE CASCADE;

-- Apagar álbum -> apaga suas músicas
ALTER TABLE music DROP CONSTRAINT IF EXISTS fk_id_album;
ALTER TABLE music ADD  CONSTRAINT fk_id_album
    FOREIGN KEY (id_album) REFERENCES album(id) ON DELETE CASCADE;

-- Apagar artista -> apaga álbuns e músicas
ALTER TABLE album DROP CONSTRAINT IF EXISTS fk_id_artist;
ALTER TABLE album ADD  CONSTRAINT fk_id_artist
    FOREIGN KEY (id_artist) REFERENCES artist(id) ON DELETE CASCADE;

ALTER TABLE music DROP CONSTRAINT IF EXISTS fk_music_artist;
ALTER TABLE music ADD  CONSTRAINT fk_music_artist
    FOREIGN KEY (id_artist) REFERENCES artist(id) ON DELETE CASCADE;

COMMIT;

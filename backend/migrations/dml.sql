
ALTER TABLE music_history
ADD CONSTRAINT fk_id_music
FOREIGN KEY (id_music)
REFERENCES music(id);

ALTER TABLE music
ADD CONSTRAINT fk_id_album
FOREIGN KEY (id_album)
REFERENCES album(id);

ALTER TABLE music
ADD CONSTRAINT fk_music_artist
FOREIGN KEY (id_artist)
REFERENCES artist(id);

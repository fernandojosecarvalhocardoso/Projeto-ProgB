INSERT INTO users (id, name, email, password_hash) VALUES
    (1,'Artur', 'artur08@email.com', '$2a$12$1UezEKG6xS3WqNM.uvPINeTXX5Z0DY7PCloRSiPUFW.NL7PGnG1ei'),
    (2,'Fernando', 'fern2366@email.com', '$2a$12$BqYTlu0PMeZnIHFv3lvKW.Wnf3YsKgsXkw9uWQl7UmJ1Pj0QvLNsy'),
    (3,'Matheus', 'matlavgamer@email.com', '$2a$12$PlF2UHRYW49lBotH7ANHG.bD5bjKJXtmYWm4TeAzst.ir8zjd4F96');

INSERT INTO artist (id, name, bio) VALUES
    (1, 'Rodrigo Zin',    'Rodrigo Valim ou Rodrigo Zin, deu início a sua trajetória desde muito novo. Inspirado pela banda Gorillaz, o artista teve uma formação musical eclética. Suas referências passam pela MPB, trap e rap experimental. Além disso, também atua como compositor, designer e produtor musical. Em 2018, foi eleito pela Genius Brasil (atual FLAGRA) como Artista Revelação do Ano. O prêmio veio como resultado do lançamento de 3 álbuns naquele mesmo ano: Francisco Oceano, Fazendo Grana Pro Meu Filme e Fazenda Diamante (Este último, em colaboração com o produtor Will Diamond). Todos estes trabalhos foram muito bem recebidos pelo público e crítica especializada. No ano seguinte, em 2019, Rodrigo lançou o que considera sua “grande obra”, o disco “Grana Azul”. O álbum contou com a participação de nomes como GABZ, Tuyo, FBC, niLL, Aka Rasta, Chediak, Ardlez e NEGUS. Produzida por enzo dicarlo & adieu, a obra acompanha uma narrativa em um mundo pós apocalíptico, dominado por poluição e ganância. Em 2021, Rodrigo Zin virou um aliado do canal 7 Minutoz, maior canal de Rap Geek do mundo, alcançando 13 milhões de views com o som Filho do Sol (seu primeiro Rap Geek). Em 2023 volta à cena com o álbum INVASOR, produzido pelo Zin, adieu & enzo dicarlo, sendo uma verdadeira invasão de sentimentos, narrando o que viveu e absorveu durante esses anos de pandemia, contando com participações especiais de Lucas Silveira (Fresno), 1LUM3, Chefe TF, Luiza Guimarães & Maina Suzuki.'),
    (2, 'Justin Bieber',  'Since his emergence in 2008, Justin Bieber has quietly worked towards delivering a career-defining artistic statement with his 2025 seventh full-length album, SWAG via Def Jam Recordings. Beyond writing songs and performing, he co-produced the LP which is a 21-track opus evocative of his evolution, yet indicative of the signature spirit millions of fans first fell in love with. Up to this point, he has smashed countless records, captivated crowds globally and led 21st century pop music and culture as both the preeminent entertainer of his generation and a peerless boundary-pushing creative force. From humble beginnings in Ontario, Canada, the Los Angeles-based singer, songwriter, and producer has elevated to one of the best-selling artists in history, moving over 150 million albums worldwide, generating nearly 200 billion streams, and scoring an astonishing 5 RIAA Diamond certifications. Speaking to his versatility, he has also delivered cross-generational hits in genres as diverse as pop, electronic, hip-hop, R&B, Latin, and more. With SWAG, he continues an unbelievable journey as an era-defining superstar whose influence is unstoppable and unparalleled'),
    (3, 'Boca Elétrica',  'Criados e apaixonados por música, os irmãos Henrikalina e Marcelinho compõem suas canções no quarto, para que todos possam ouvi-las. A dupla vem lançando seus trabalhos desde o começo deste ano, misturando ritmos que vão da MPB ao indie alternativo, criando um som único que soa bem aos seus ouvidos');

INSERT INTO album (id, title, id_artist) VALUES
    (1, 'Invasor', 1),
    (2,'My World 2.0', 2),
    (3,'Sinto Tudo, Sinto Nada', 3);

INSERT INTO music (id,name, duration_seconds, id_album, genre, id_artist, cover) VALUES
    (1, 'Camomila', 203, 1, 'Trap', 1, 'backend/covers/invasor.jpg'),
    (2,  'Baby', 214, 2, 'Pop', 2, 'backend/covers/myworld2.jpg'),
    (3,  'Sinto tudo, sinto nada', 180, 3, 'Indie', 3,'backend/covers/sintotudosintonada.jpg' );

INSERT INTO music_history (id_history, id_user, id_music) VALUES
    (1, 1 ,3),
    (2, 2, 1),
    (3, 3, 3);


INSERT INTO search_history (id, search_query, results, id_user) VALUES
    (1,    'Thriller', 'Thriller', 2),
    (2,  'Vem-Vem', 'Cantiga de Vem Vem', 3),
    (3,  'Baby, i know you love me', 'Baby', 1);


INSERT INTO users_favorites (id_user, id_music) VALUES
    (1, 1),
    (2, 3),
    (3, 3);


SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('artist_id_seq', (SELECT MAX(id) FROM artist));
SELECT setval('album_id_seq', (SELECT MAX(id) FROM album));
SELECT setval('music_id_seq', (SELECT MAX(id) FROM music));
SELECT setval('music_history_id_history_seq', (SELECT MAX(id_history) FROM music_history));
SELECT setval('search_history_id_seq', (SELECT MAX(id) FROM search_history));
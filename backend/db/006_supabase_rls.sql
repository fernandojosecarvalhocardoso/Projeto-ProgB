-- SOMENTE PARA SUPABASE (os papéis anon/authenticated não existem em Postgres local).
-- Rode depois dos arquivos 001 a 005.
--
-- O Supabase expõe o schema "public" por uma API REST automática (Data API).
-- Tabelas criadas via SQL ficam SEM RLS e com permissão para o papel "anon",
-- ou seja, qualquer pessoa com a chave pública do projeto leria, por exemplo,
-- users.password_hash. Este script fecha esse acesso. O backend não é afetado,
-- pois conecta como "postgres", que ignora RLS.
BEGIN;

ALTER TABLE users            ENABLE ROW LEVEL SECURITY;
ALTER TABLE artist           ENABLE ROW LEVEL SECURITY;
ALTER TABLE album            ENABLE ROW LEVEL SECURITY;
ALTER TABLE music            ENABLE ROW LEVEL SECURITY;
ALTER TABLE music_history    ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_history   ENABLE ROW LEVEL SECURITY;
ALTER TABLE users_favorites  ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE users, artist, album, music, music_history, search_history, users_favorites
    FROM anon, authenticated;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon, authenticated;

COMMIT;

-- Conferir (rowsecurity deve ser true em todas):
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';

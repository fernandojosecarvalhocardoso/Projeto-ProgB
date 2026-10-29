-- Papéis de acesso: 'user' (padrão) e 'admin'
BEGIN;
ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) NOT NULL DEFAULT 'user';
ALTER TABLE users DROP CONSTRAINT IF EXISTS chk_users_role;
ALTER TABLE users ADD CONSTRAINT chk_users_role CHECK (role IN ('user', 'admin'));
COMMIT;

-- Para promover alguém a admin (ou use: npm run make-admin -- email@exemplo.com):
-- UPDATE users SET role = 'admin' WHERE email = 'artur08@email.com';

const { Router } = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const asyncHandler = require('../lib/asyncHandler');
const { sign } = require('../lib/token');
const authenticate = require('../middlewares/authenticate');

const router = Router();
// Hash falso usado para igualar o tempo de resposta quando o e-mail não existe
const DUMMY_HASH = bcrypt.hashSync('dummy-password', 12);

// Cadastro público: o papel é sempre 'user' (padrão do banco)
router.post('/register', asyncHandler(async (req, res) => {
  const { name, password } = req.body;
  const email = String(req.body.email || '').trim().toLowerCase();

  if (!name || !email || !password) return res.status(400).json({ error: 'Campos obrigatórios: name, email, password' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'E-mail inválido' });
  if (String(password).length < 8) return res.status(400).json({ error: 'A senha deve ter ao menos 8 caracteres' });

  const hash = await bcrypt.hash(password, 12);
  const { rows } = await pool.query(
    'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, role, created_at',
    [name, email, hash]
  );
  res.status(201).json({ user: rows[0], token: sign(rows[0].id) });
}));

router.post('/login', asyncHandler(async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');
  if (!email || !password) return res.status(400).json({ error: 'Informe email e password' });

  const { rows } = await pool.query(
    'SELECT id, name, email, role, created_at, password_hash FROM users WHERE email = $1',
    [email]
  );
  const user = rows[0];
  const ok = await bcrypt.compare(password, user ? user.password_hash : DUMMY_HASH);
  if (!user || !ok) return res.status(401).json({ error: 'Credenciais inválidas' });

  const { password_hash, ...safe } = user;
  res.json({ user: safe, token: sign(user.id) });
}));

router.get('/me', authenticate, asyncHandler(async (req, res) => {
  const { rows } = await pool.query(
    'SELECT id, name, email, role, created_at FROM users WHERE id = $1',
    [req.user.id]
  );
  res.json(rows[0]);
}));

module.exports = router;

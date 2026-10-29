const pool = require('../config/db');
const { verify } = require('../lib/token');
const asyncHandler = require('../lib/asyncHandler');

// Valida o Bearer token e carrega o usuário ATUAL do banco em req.user ({ id, role }).
// Assim, mudanças de papel e exclusão de usuário têm efeito imediato.
module.exports = asyncHandler(async (req, res, next) => {
  const [type, token] = (req.headers.authorization || '').split(' ');
  if (type !== 'Bearer' || !token) return res.status(401).json({ error: 'Token ausente' });

  let payload;
  try {
    payload = verify(token);
  } catch {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }

  const { rows } = await pool.query('SELECT id, role FROM users WHERE id = $1', [payload.sub]);
  if (!rows.length) return res.status(401).json({ error: 'Usuário não existe mais' });

  req.user = rows[0];
  next();
});

const { Router } = require('express');
const pool = require('../config/db');
const asyncHandler = require('./asyncHandler');
const requireRole = require('../middlewares/requireRole');

const pick = (obj = {}, keys) =>
  Object.fromEntries(keys.filter((k) => obj[k] !== undefined).map((k) => [k, obj[k]]));

/**
 * Gera as rotas: GET /, GET /:id, POST /, PUT /:id, DELETE /:id
 *
 * columns     : colunas aceitas no body (whitelist)
 * required    : colunas obrigatórias no POST
 * select      : colunas retornadas (ex.: esconder password_hash)
 * prepare     : (body, req) => body final que será gravado
 * present     : transforma cada linha antes de responder
 * upload      : middleware extra (ex.: multer) para POST/PUT
 * scope       : coluna "dona" do registro; quem não está em scopeBypass só
 *               enxerga/altera/apaga linhas em que scope = req.user.id
 * scopeBypass : papéis que ignoram o scope (ex.: ['admin'])
 * writeRoles  : papéis autorizados a POST/PUT/DELETE (ex.: ['admin']); leitura é livre
 * omit        : rotas a desativar, ex.: ['create']
 */
function crud({
  table,
  pk = 'id',
  columns,
  required = [],
  select = '*',
  prepare = async (b) => b,
  present = (r) => r,
  upload = (req, res, next) => next(),
  scope = null,
  scopeBypass = [],
  writeRoles = null,
  omit = [],
}) {
  const router = Router();
  const ownerColumn = scope && scope !== pk; // dono em coluna separada (ex.: id_user)
  const guardWrite = writeRoles ? requireRole(...writeRoles) : (req, res, next) => next();
  const scoped = (req) => Boolean(scope) && !scopeBypass.includes(req.user.role);

  router.get('/', asyncHandler(async (req, res) => {
    const limit = Math.min(parseInt(req.query.limit) || 50, 200);
    const offset = parseInt(req.query.offset) || 0;
    const params = [limit, offset];
    let where = '';
    if (scoped(req)) {
      params.push(req.user.id);
      where = `WHERE ${scope} = $3`;
    }
    const { rows } = await pool.query(
      `SELECT ${select} FROM ${table} ${where} ORDER BY ${pk} LIMIT $1 OFFSET $2`,
      params
    );
    res.json(rows.map(present));
  }));

  router.get('/:id', asyncHandler(async (req, res) => {
    const params = [req.params.id];
    let where = `${pk} = $1`;
    if (scoped(req)) {
      params.push(req.user.id);
      where += ` AND ${scope} = $2`;
    }
    const { rows } = await pool.query(`SELECT ${select} FROM ${table} WHERE ${where}`, params);
    if (!rows.length) return res.status(404).json({ error: 'Registro não encontrado' });
    res.json(present(rows[0]));
  }));

  if (!omit.includes('create')) {
    router.post('/', guardWrite, upload, asyncHandler(async (req, res) => {
      let body = pick(req.body, columns);
      if (ownerColumn) body[scope] = req.user.id; // registros novos são sempre do próprio usuário

      const missing = required.filter((k) => body[k] === undefined || body[k] === '');
      if (missing.length) return res.status(400).json({ error: `Campos obrigatórios: ${missing.join(', ')}` });

      body = await prepare(body, req);
      const keys = Object.keys(body);
      const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
      const { rows } = await pool.query(
        `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING ${select}`,
        keys.map((k) => body[k])
      );
      res.status(201).json(present(rows[0]));
    }));
  }

  router.put('/:id', guardWrite, upload, asyncHandler(async (req, res) => {
    const body = await prepare(pick(req.body, columns), req);
    if (!Object.keys(body).length) return res.status(400).json({ error: 'Nenhum campo para atualizar' });
    if (ownerColumn && scoped(req)) body[scope] = req.user.id;

    const keys = Object.keys(body);
    const params = [...keys.map((k) => body[k]), req.params.id];
    let where = `${pk} = $${keys.length + 1}`;
    if (scoped(req)) {
      params.push(req.user.id);
      where += ` AND ${scope} = $${keys.length + 2}`;
    }
    const sets = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    const { rows } = await pool.query(`UPDATE ${table} SET ${sets} WHERE ${where} RETURNING ${select}`, params);
    if (!rows.length) return res.status(404).json({ error: 'Registro não encontrado' });
    res.json(present(rows[0]));
  }));

  router.delete('/:id', guardWrite, asyncHandler(async (req, res) => {
    const params = [req.params.id];
    let where = `${pk} = $1`;
    if (scoped(req)) {
      params.push(req.user.id);
      where += ` AND ${scope} = $2`;
    }
    const { rowCount } = await pool.query(`DELETE FROM ${table} WHERE ${where}`, params);
    if (!rowCount) return res.status(404).json({ error: 'Registro não encontrado' });
    res.status(204).end();
  }));

  return router;
}

module.exports = crud;

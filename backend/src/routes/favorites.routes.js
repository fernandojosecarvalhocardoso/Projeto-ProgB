const { Router } = require('express');
const pool = require('../config/db');
const asyncHandler = require('../lib/asyncHandler');

// users_favorites tem chave composta, então não usa a fábrica de CRUD.
// Sempre do usuário logado.
const router = Router();

router.get('/', asyncHandler(async (req, res) => {
  const { rows } = await pool.query(
    `SELECT f.id_music, m.name AS music_name, f.created_at
       FROM users_favorites f JOIN music m ON m.id = f.id_music
      WHERE f.id_user = $1 ORDER BY f.created_at DESC`,
    [req.user.id]
  );
  res.json(rows);
}));

router.post('/', asyncHandler(async (req, res) => {
  const { id_music } = req.body;
  if (!id_music) return res.status(400).json({ error: 'Campo obrigatório: id_music' });
  const { rows } = await pool.query(
    'INSERT INTO users_favorites (id_user, id_music) VALUES ($1, $2) RETURNING *',
    [req.user.id, id_music]
  );
  res.status(201).json(rows[0]);
}));

router.delete('/:id_music', asyncHandler(async (req, res) => {
  const { rowCount } = await pool.query(
    'DELETE FROM users_favorites WHERE id_user = $1 AND id_music = $2',
    [req.user.id, req.params.id_music]
  );
  if (!rowCount) return res.status(404).json({ error: 'Favorito não encontrado' });
  res.status(204).end();
}));

module.exports = router;

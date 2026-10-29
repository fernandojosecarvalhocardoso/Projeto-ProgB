// Uso: router.post('/', requireRole('admin'), handler)
module.exports = (...roles) => (req, res, next) =>
  roles.includes(req.user?.role)
    ? next()
    : res.status(403).json({ error: 'Acesso negado: permissão insuficiente' });

const notFound = (req, res) => res.status(404).json({ error: 'Rota não encontrada' });

// Traduz erros do Postgres/multer em respostas HTTP adequadas
const errorHandler = (err, req, res, next) => {
  if (err.code === '23505') return res.status(409).json({ error: 'Registro duplicado (valor já existe)' });
  if (err.code === '23503') return res.status(409).json({ error: 'Referência inexistente' });
  if (err.code === '23502') return res.status(400).json({ error: 'Campo obrigatório ausente' });
  if (err.code === '23514') return res.status(400).json({ error: 'Valor não permitido' });
  if (err.code === '22P02') return res.status(400).json({ error: 'Valor com formato inválido' });
  if (err.name === 'MulterError') return res.status(400).json({ error: err.message });
  if (err.status) return res.status(err.status).json({ error: err.message });
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor' });
};

module.exports = { notFound, errorHandler };

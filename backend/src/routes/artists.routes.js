const crud = require('../lib/crud');

// Leitura: qualquer usuário logado. Escrita: somente admin.
module.exports = crud({
  table: 'artist',
  columns: ['name', 'bio'],
  required: ['name'],
  writeRoles: ['admin'],
});

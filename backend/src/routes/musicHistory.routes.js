const crud = require('../lib/crud');

// Sempre do usuário logado (id_user vem do token)
module.exports = crud({
  table: 'music_history',
  pk: 'id_history',
  columns: ['id_music'],
  required: ['id_music'],
  scope: 'id_user',
});

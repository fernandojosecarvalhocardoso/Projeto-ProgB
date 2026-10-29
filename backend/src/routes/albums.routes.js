const crud = require('../lib/crud');

module.exports = crud({
  table: 'album',
  columns: ['title', 'id_artist'],
  required: ['title', 'id_artist'],
  writeRoles: ['admin'],
});

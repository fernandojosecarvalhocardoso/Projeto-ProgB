const crud = require('../lib/crud');

module.exports = crud({
  table: 'search_history',
  columns: ['search_query', 'results'],
  required: ['search_query'],
  scope: 'id_user',
});

const { Pool } = require('pg');
const env = require('./env');

module.exports = new Pool({
  connectionString: env.databaseUrl,
  ssl: env.dbSsl ? { rejectUnauthorized: false } : false,
  max: 10, });

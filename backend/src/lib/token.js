const jwt = require('jsonwebtoken');
const env = require('../config/env');

exports.sign = (userId) =>
  jwt.sign({ sub: userId }, env.jwtSecret, { algorithm: 'HS256', expiresIn: env.jwtExpiresIn });

exports.verify = (token) => jwt.verify(token, env.jwtSecret, { algorithms: ['HS256'] });

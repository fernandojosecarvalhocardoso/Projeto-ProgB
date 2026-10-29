const express = require('express');
const cors = require('cors');
const path = require('path');
const authenticate = require('./middlewares/authenticate');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Capas públicas: GET /covers/invasor.jpg
app.use('/covers', express.static(path.join(__dirname, '../covers')));

// Públicas: /auth/register e /auth/login. Todo o resto exige Bearer token.
app.use('/auth', require('./routes/auth.routes'));
app.use(authenticate, require('./routes'));

app.use(notFound);
app.use(errorHandler);

module.exports = app;

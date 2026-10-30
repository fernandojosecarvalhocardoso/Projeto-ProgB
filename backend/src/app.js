const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const authenticate = require('./middlewares/authenticate');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Capas públicas: GET /covers/invasor.jpg
app.use('/covers', express.static(path.join(__dirname, '../covers')));

// Documentação (pública): interface em /docs e especificação crua em /openapi.json
const openapi = yaml.load(fs.readFileSync(path.join(__dirname, 'docs/openapi.yaml'), 'utf8'));
app.get('/openapi.json', (req, res) => res.json(openapi));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi, {
  customSiteTitle: 'API de Música - Docs',
  swaggerOptions: { persistAuthorization: true }, // mantém o token ao recarregar a página
}));

// Públicas: /auth/register e /auth/login. Todo o resto exige Bearer token.
app.use('/auth', require('./routes/auth.routes'));
app.use(authenticate, require('./routes'));

app.use(notFound);
app.use(errorHandler);

module.exports = app;

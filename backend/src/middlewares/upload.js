const multer = require('multer');
const path = require('path');
const httpError = require('../lib/httpError');

// Campo multipart "cover" -> grava em backend/covers
module.exports = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, '../../covers'),
    filename: (req, file, cb) =>
      cb(null, `${Date.now()}${path.extname(file.originalname).toLowerCase()}`),
  }),
  fileFilter: (req, file, cb) =>
    /^image\/(jpeg|png|webp)$/.test(file.mimetype)
      ? cb(null, true)
      : cb(httpError(400, 'A capa deve ser JPG, PNG ou WEBP')),
  limits: { fileSize: 5 * 1024 * 1024 },
}).single('cover');

const path = require('path');
const crud = require('../lib/crud');
const upload = require('../middlewares/upload');

module.exports = crud({
  table: 'music',
  columns: ['name', 'duration_seconds', 'id_album', 'genre', 'id_artist', 'cover'],
  required: ['name', 'duration_seconds', 'id_album', 'id_artist'],
  writeRoles: ['admin'],
  upload,
  // Se veio arquivo (multipart, campo "cover"), grava o caminho no mesmo formato do seed
  prepare: async (b, req) => {
    if (req.file) b.cover = `backend/covers/${req.file.filename}`;
    return b;
  },
  present: (r) => ({ ...r, cover_url: r.cover ? `/covers/${path.basename(r.cover)}` : null }),
});

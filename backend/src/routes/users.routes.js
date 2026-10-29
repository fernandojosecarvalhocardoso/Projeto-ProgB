const bcrypt = require('bcryptjs');
const crud = require('../lib/crud');
const httpError = require('../lib/httpError');

// user : vê/edita/apaga somente a si mesmo
// admin: vê/edita/apaga qualquer usuário e pode alterar o papel (role)
// Criação de contas: POST /auth/register
module.exports = crud({
  table: 'users',
  columns: ['name', 'email', 'password', 'role'],
  select: 'id, name, email, role, created_at',
  scope: 'id',
  scopeBypass: ['admin'],
  omit: ['create'],
  prepare: async (b, req) => {
    if (b.role !== undefined) {
      if (req.user.role !== 'admin') throw httpError(403, 'Apenas administradores podem alterar o papel');
      if (!['user', 'admin'].includes(b.role)) throw httpError(400, "Papel inválido (use 'user' ou 'admin')");
      if (Number(req.params.id) === req.user.id && b.role !== 'admin') {
        throw httpError(400, 'Você não pode remover seu próprio papel de admin');
      }
    }
    if (b.email) b.email = String(b.email).trim().toLowerCase();
    if (b.password) {
      if (String(b.password).length < 8) throw httpError(400, 'A senha deve ter ao menos 8 caracteres');
      b.password_hash = await bcrypt.hash(b.password, 12);
    }
    delete b.password;
    return b;
  },
});

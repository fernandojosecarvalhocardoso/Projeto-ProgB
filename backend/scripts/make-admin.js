// Uso: npm run make-admin -- email@exemplo.com
const pool = require('../src/config/db');

(async () => {
  const email = String(process.argv[2] || '').trim().toLowerCase();
  if (!email) {
    console.error('Uso: npm run make-admin -- email@exemplo.com');
    process.exit(1);
  }
  const { rowCount } = await pool.query("UPDATE users SET role = 'admin' WHERE email = $1", [email]);
  console.log(rowCount ? `${email} agora é admin` : 'Usuário não encontrado');
  await pool.end();
})().catch((e) => { console.error(e.message); process.exit(1); });

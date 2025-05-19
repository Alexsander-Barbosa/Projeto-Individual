const fs = require('fs');
const path = require('path');
const db = require('../config/db');

const sqlFilePath = path.join(__dirname, '202505191612.sql');

(async () => {
  try {
    const sql = fs.readFileSync(sqlFilePath, 'utf8');
    console.log(`🔄 Executando: ${sqlFilePath}`);
    await db.query(sql);
    console.log('✅ Migração aplicada com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao executar migração:', error.message);
    process.exit(1);
  }
})();
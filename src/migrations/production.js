const fs = require('fs');
const path = require('path');
const db = require('../config/db');

const migrationsDirPath = __dirname;

(async () => {
  try {
    const migrationFiles = fs.readdirSync(migrationsDirPath)
      .filter(file => file.endsWith('.sql'))
      .sort();

    if (migrationFiles.length === 0) {
      console.log('ℹ️ Nenhuma migration SQL encontrada para executar.');
      process.exit(0);
    }

    console.log('🚀 Iniciando a aplicação das migrations...');

    for (const fileName of migrationFiles) {
      const filePath = path.join(migrationsDirPath, fileName);
      const sql = fs.readFileSync(filePath, 'utf8');

      console.log(`🔄 Executando migration: ${fileName}`);
      await db.query(sql);
      console.log(`✅ Migration "${fileName}" aplicada com sucesso!`);
    }

    console.log('🎉 Todas as migrations foram aplicadas com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao executar migrations:', error.message);
    console.error('Stack Trace do Erro na Migração:', error.stack);
    process.exit(1);
  }
})();
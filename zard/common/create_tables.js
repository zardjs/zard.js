const { Player, PlayerData } = require('../models/players');

async function checkAndCreateTables() {
  try {
    // Verificar e criar a tabela "users"
    const PlayerTable = await Player.sync();
    const PlayerData = await PlayerData.sync();
    if (!PlayerTable && !PlayerData) {
      await Player.sync({ force: true });
      await PlayerData.sync({ force: true });
      console.log('Tabela "player" criada com sucesso!');
    }

    console.log('Todas as tabelas foram verificadas e criadas, se necessário.');
  } catch (error) {
    console.error('Erro ao verificar e criar tabelas:', error);
  }
}

module.exports = { checkAndCreateTables };

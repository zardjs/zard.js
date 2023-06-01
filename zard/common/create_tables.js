const { Player, PlayerData, Banishment } = require('../models/players')

async function checkAndCreateTables() {
  try {
    const PlayerTable = await Player.sync()
    const PlayerDataTable = await PlayerData.sync()
    const BanishmentDataTable = await Banishment.sync()
    if (!PlayerTable && !PlayerDataTable && !BanishmentDataTable) {
      await Player.sync({ force: true })
      await PlayerDataTable.sync({ force: true })
      await BanishmentDataTable.sync({ force: true })
      console.log('Tabela "player" criada com sucesso!')
    }

    console.log('Todas as tabelas foram verificadas e criadas, se necessário.')
  } catch (error) {
    console.error('Erro ao verificar e criar tabelas:', error)
  }
}

module.exports = { checkAndCreateTables }

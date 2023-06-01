module.exports = {
  decodeuUser: async function (source) {
    let data = {}
    let identifiers = []
    let numIdentifiers = GetNumPlayerIdentifiers(source)
    for (let i = 0; i < numIdentifiers; i++) {
      let identifier = GetPlayerIdentifier(source, i)
      identifiers.push(identifier)
    }
    for (let i = 0; i < identifiers.length; i++) {
      const identifier = identifiers[i]
      switch (true) {
        case identifier.startsWith('license:'):
          // Extrair o valor da licença
          data.license = identifier.split(':')[1]
          break
        case identifier.startsWith('discord:'):
          data.discord = identifier.split(':')[1]
          break
        case identifier.startsWith('fivem:'):
          data.fivem = identifier.split(':')[1]
          break
        case identifier.startsWith('license2:'):
          data.license2 = identifier.split(':')[1]
          break
        case identifier.startsWith('ip:'):
          data.ip = identifier.split(':')[1]
          break
        default:
          break
      }
    }
    return data
  },
  authenticateUser: async function (license) {
    try {
      const result = await Zard.server.Querys.findByAll('players', {
        identifier: license,
      })
      return result
    } catch (error) {
      console.error('Ocorreu um erro durante a autenticação do usuário:', error)
      throw error
    }
  },
  checkBanishment: async function (playerId) {
    try {
      const result = await Zard.server.Querys.findBy(
        'banishments',
        {
          playerId: playerId,
        },
        ['duracao', 'motivo', 'data']
      )

      if (result) {
        const { motivo, duracao, data } = result

        if (duracao) {
          const duracaoFormatada = formatDuration(data, duracao)

          return {
            motivo: motivo,
            duracao: duracaoFormatada,
            data: formatarData(data),
          }
        } else {
          return { motivo, duracao: 'Indeterminado', data: null }
        }
      } else {
        return null
      }
    } catch (error) {
      console.error('Ocorreu um erro durante a verificação de banido:', error)
      throw error
    }
  },
}

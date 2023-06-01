on('playerConnecting', async (name, setKickReason, deferrals) => {
  deferrals.defer()
  deferrals.update('Autenticando...')

  let player = global.source
  let { ip, license, steam, discord } = await Zard.server.Functions.decodeuUser(player)

  if (!license) return

  let user = await Zard.server.Functions.authenticateUser(license)

  if (user && user.length) {
    deferrals.update('Verificando lista de banimento')
    let { motivo, duracao } = await Zard.server.Functions.checkBanishment(user[0].id)

    const tempoPassou = verificarTempoPassado(duracao)
    if (duracao && !tempoPassou) {
      deferrals.done(
        `\nVocê foi banido pelo motivo: "${motivo}"\n Seu banimento expirar em: ${duracao}.`
      )
    } else {
      deferrals.update('ja foi desbanido <3')
    }
  } else {
    await createUserLastId(license)
    deferrals.update('cadastro')
  }
})

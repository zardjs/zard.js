const moment = require('moment')

function getCurrentMoment(duration) {
  return moment(duration).utcOffset(0)
}

function setMomentLocale() {
  const moment = require('moment-timezone')
  require(`moment/locale/pt-br`)
  moment.locale('pt-br')
  moment.updateLocale('pt-br', null)
}

function formatarData(data) {
  return moment(data).format('LL')
}

function formatDuration(start, end) {
  const horas = moment(end).diff(moment(start), 'hours')
  const minutos = moment(end).diff(moment(start), 'minutes')
  const segundos = moment(end).diff(moment(start), 'seconds')

  let formattedDuration = ''

  if (horas > 0) {
    formattedDuration += `${horas} horas, `
  }
  if (minutos > 0) {
    formattedDuration += `${minutos} minutos, `
  }
  if (segundos > 0) {
    formattedDuration += `${segundos} segundos`
  }

  return formattedDuration.trim()
}

function verificarTempoPassado(data) {
  const momentoAtual = moment()
  const dataComparacao = moment(data)

  return momentoAtual.isAfter(dataComparacao)
}

module.exports = {
  formatDuration,
  formatarData,
  getCurrentMoment,
  verificarTempoPassado,
}

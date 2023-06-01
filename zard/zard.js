const { sequelize } = require('./configs/database')
const readConfig = require('./common/config')
const { Locales, loadLocale } = require('./utils/i18n')
const { handleError, handleSuccess } = require('./utils/error')
const { checkAndCreateTables } = require('./common/create_tables')
const loadserver = require('./server/load')

console.log(' ______                  _      _')
console.log('|___  /                 | |    (_)')
console.log('   / /   __ _  _ __   __| |     _  ___')
console.log("  / /   / _` || '__| / _` |    | |/ __|")
console.log('./ /___| (_| || |   | (_| | _  | |__ \\')
console.log('\\_____/ \\__,_||_|    \\__,_|(_) | ||___/')
console.log('                              _/ |')
console.log('                             |__/')
console.log('==================== Framework Fivem ==========')

class Zard {
  static debug = false
  static server = loadserver
  constructor() {
    this.connection = null
    this.initialized = false
    this.initialize()
  }

  initialize() {
    this.loadConfig()
    if (!this.initialized) {
      this.initializeDatabase()
      this.initialized = true
    }
  }

  loadConfig() {
    try {
      const config = readConfig()
      Zard.debug = config.debug
      this.language = config.language
      loadLocale(config.language)
    } catch (err) {
      handleError(Locales[this.language]?.errorLoadingConfig, err)
    }
  }

  async initializeDatabase() {
    this.connection = sequelize
    try {
      await sequelize.authenticate()
      handleSuccess(Locales[this.language]?.databaseConnectionSuccess)
    } catch (error) {
      handleError(Locales[this.language]?.errorInitializingDatabase, err)
      return
    }
    try {
      await sequelize.sync()
      await checkAndCreateTables()
      handleSuccess(Locales[this.language]?.databaseSyncSuccess)
    } catch (error) {
      handleError(Locales[this.language]?.errorSyncingDatabase, err)
    }
  }

  static initialize() {
    const zard = new Zard()
    return zard
  }
}

Zard.initialize()

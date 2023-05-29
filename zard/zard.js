const fs = require('fs');
const sequelize = require('./configs/database');
const  readConfig  = require('./common/utils');
const { checkAndCreateTables } = require('./common/create_tables');

console.log(" ______                  _      _");
console.log("|___  /                 | |    (_)");
console.log("   / /   __ _  _ __   __| |     _  ___");
console.log("  / /   / _` || '__| / _` |    | |/ __|");
console.log("./ /___| (_| || |   | (_| | _  | |\__ \\");
console.log("\\_____/\\__,_||_|  \\__,_|(_) | ||___/");
console.log("                              _/ |");
console.log("                             |__/");

class Zard {
  constructor() {
    this.connection = null;
    this.initialized = false;
    this.initialize();
  }

  initialize() {
    this.loadConfig();
    if (!this.initialized) {
      this.initializeDatabase();
      this.initialized = true;
    }
  }

  loadConfig() {
    try {
      const config = readConfig();
      this.language = config.language;
    } catch (err) {
      console.error('Erro ao carregar as configurações:', err);
    }
  }

  async initializeDatabase() {
    try {
      // Testa a conexão com o banco de dados
      await sequelize.authenticate();
      console.log('Conexão com o banco de dados estabelecida com sucesso!');
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados:', error);
      return;
    }


    try {
      // Sincroniza o banco de dados
      await sequelize.sync();
      console.log('Banco de dados sincronizado com sucesso!');
      await checkAndCreateTables();
    } catch (error) {
      console.error('Erro ao sincronizar o banco de dados');
    }

    this.connection = sequelize;
  }
}

const zardInstance = new Zard();
zardInstance.initialize();

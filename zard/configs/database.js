const Sequelize = require('sequelize');
const readConfig = require('../common/utils');




const { database, host, user, password, dialect } = readConfig().database;



const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: dialect
});

module.exports = sequelize;

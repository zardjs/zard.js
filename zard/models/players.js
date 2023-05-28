const  sequelize  = require('../configs/database');
const { DataTypes } = require('sequelize');

const Player = sequelize.define('zard_players', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    whitelisted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    banned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    groups: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: []
    }
  });
  
  const PlayerData = sequelize.define('zard_players_data', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    playerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'zard_players',
        key: 'id'
      }
    },
 
  });
  
  Player.hasMany(PlayerData, {
    foreignKey: 'playerId'
  });
  PlayerData.belongsTo(Player, {
    foreignKey: 'playerId'
  });
  


  module.exports = {
    Player: Player,
    PlayerData: PlayerData
  };

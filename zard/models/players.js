
const { sequelize } = require("../configs/database");
const { DataTypes } = require("sequelize");

const Player = sequelize.define("players", {
  identifier: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  whitelisted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

const PlayerData = sequelize.define("players_data", {
  playerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "players",
      key: "id",
    },
  },
});

const Banishment = sequelize.define("banishments", {
  playerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "players",
      key: "id",
    },
  },
  motivo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  duracao: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

Player.hasMany(PlayerData, {
  foreignKey: "playerId",
});

PlayerData.belongsTo(Player, {
  foreignKey: "playerId",
});

Player.hasMany(Banishment, {
  foreignKey: "playerId",
});

Banishment.belongsTo(Player, {
  foreignKey: "playerId",
});

module.exports = {
  Player: Player,
  PlayerData: PlayerData,
  Banishment: Banishment,
};

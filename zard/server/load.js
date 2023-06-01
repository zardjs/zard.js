const root = GetResourcePath(GetCurrentResourceName());

const { Player, PlayerData, Banishment } = require(`${root}/models/players`);
const serverFunctions = require(`${root}/server/functions`);
const serverQuerys = require(`${root}/server/querys`);

const server = {
  Functions: serverFunctions,
  Querys: serverQuerys,
    Models: {
      Player: Player,
      PlayerData: PlayerData,
      Banishment: Banishment,
    },
  };
  
  module.exports = server;
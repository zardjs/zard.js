const fs = require('fs');
const root = GetResourcePath(GetCurrentResourceName());

function readConfig() {
  try {
    const configData = fs.readFileSync(`${root}/configs/config.json`, 'utf8');
    return JSON.parse(configData);
  } catch (error) {
    console.error('Erro ao ler o arquivo de configuração:', error);
    return null;
  }
}

module.exports = readConfig;
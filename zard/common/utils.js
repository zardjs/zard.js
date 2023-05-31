const fs = require('fs');
const root = GetResourcePath(GetCurrentResourceName());

function readConfig() {
  try {
    const config = fs.readFileSync(`${root}/configs/config.json`, 'utf8');
    return JSON.parse(config);
  } catch (error) {
    console.error('Erro ao ler o arquivo de configuração:', error);
    return null;
  }
}

module.exports = readConfig;

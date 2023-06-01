const fs = require("fs");
const root = GetResourcePath(GetCurrentResourceName());

const Locales = {};

// Função para carregar as mensagens de erro de um arquivo de idioma específico
function loadLocale(language) {


  try {
    const localeData = fs.readFileSync(
      `${root}/locales/${language}.json`,
      "utf8"
    );
    const localeMessages = JSON.parse(localeData);


    
    Locales[language] = localeMessages;


  } catch (error) {
    console.error(
      `Erro ao carregar mensagens de erro para o idioma ${language}:`,
      error
    );
    Locales[language] = {};
  }
}

module.exports = { Locales,loadLocale };
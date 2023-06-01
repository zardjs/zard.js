fx_version 'bodacious'
game 'gta5'
version '0.0.1'
author 'Zard Framework'

client_scripts {
    'client/*.js',
    'zard.js'
}

server_scripts {
	'zard.js',
    'server/events.js',
    'utils/data.js'
}

files{
    'configs/config.json'
}

dependency 'yarn'

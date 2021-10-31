const BotClient = require('./Structures/BotClient')
const config = require('../config.json');

require('dotenv').config();

const token = process.env.TOKEN
config['token'] = token

const client = new BotClient(config);
console.log(config)
console.log(client.slashCommands)
client.start();
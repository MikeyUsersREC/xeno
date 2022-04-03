const BotClient = require('./Structures/BotClient')
const config = require('../config.json');
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
require('dotenv').config();

module.exports = Sentry.init({
  dsn: process.env.SENTRY_TOKEN,
  tracesSampleRate: 1.0,
});

const token = process.env.TOKEN
config['token'] = token
  

const client = new BotClient(config);
console.log(config)
client.start();


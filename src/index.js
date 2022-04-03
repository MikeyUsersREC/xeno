const BotClient = require('./Structures/BotClient')
const config = require('../config.json');
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
require('dotenv').config();

Sentry.init({
  dsn: process.env.SENTRY_TOKEN,
  tracesSampleRate: 1.0,
});

const token = process.env.TOKEN
config['token'] = token

const transaction = Sentry.startTransaction({
    op: "xenorun",
    name: "Running Xeno",
});
  
try {
    const client = new BotClient(config);
    console.log(config)
    client.start();
} catch (e) {
    Sentry.captureException(e);
    console.log(e)
} finally {
    transaction.finish()
}

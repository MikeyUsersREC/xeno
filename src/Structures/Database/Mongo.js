const mongoose = require('mongoose')
require('dotenv').config();

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        }

        mongoose.connect(`mongodb+srv://xeno:${process.env.MONGODB_PASSWORD}@xenodiscordbot.twt3s.mongodb.net/xeno?retryWrites=true&w=majority`)
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log('Xeno has connected to the Database.')
        })

        mongoose.connection.on('disconnected', () => {
            console.log('Xeno has disconnected from the Database.')
        })

        mongoose.connection.on('err', (err) => {
            console.log(`An error has occured whilst connecting to the database: ${err}`)
        })
    }
}
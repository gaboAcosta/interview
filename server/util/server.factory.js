
const express = require('express')
const router = require('../routes')
const mongoose = require('mongoose');

const env = process.env.NODE_ENV || 'develop'

module.exports = () => {
    const testDb = 'mongodb://<dbuser>:<dbpassword>@ds111336.mlab.com:11336/unosquare-test'
    const db = 'mongodb://unosquare:unosquare@ds113046.mlab.com:13046/unosquare'
    const dbName = env === 'test' ? testDb : db
    mongoose.connect(dbName , { useMongoClient: true }, (error) => {
        if(error){
            throw error
        }
        console.log('Connected to MongoDB');
    });

    mongoose.Promise = global.Promise;

    const app = express()
    router(app)
    return app
}

const express = require('express')
const router = require('../routes')
const mongoose = require('mongoose');

const env = process.env.NODE_ENV || 'develop'

module.exports = () => {
    const dbName = env === 'test' ? 'unosquare-test' : 'unosquare'
    const db = mongoose.connect(`mongodb://localhost/${dbName}`, { useMongoClient: true }, (error) => {
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
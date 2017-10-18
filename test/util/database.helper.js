const mongoose = require('mongoose')
const _ = require('lodash')

class DatabaseHelper {

    static dropCollection(collection){
        return new Promise((resolve) => {
            collection.remove({}, () => {
                resolve()
            })
        })
    }

    static wipeCollections(){

        const { collections } = mongoose.connection
        const collectionNames = Object.keys(collections)
        const promises = collectionNames.map((collectionName) => {
            return DatabaseHelper.dropCollection(collections[collectionName])
        })

        return Promise.all(promises)

    }

    static insertToCollection(collectionName, documents){
        return new Promise((resolve, reject) => {
            const { db } = mongoose.connection

            const collection = db.collection(collectionName)
            collection.insertMany(_.cloneDeep(documents), function(err, result) {
                if(err) return reject(err)
                resolve(result);
            });
        })
    }

    static disConnect(){
        return mongoose.connection.close()
    }
}

module.exports = DatabaseHelper
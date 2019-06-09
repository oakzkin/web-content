const MongoClient = require('mongodb').MongoClient


//Connect Mongo

const connectMongo = (url, dbName, callback) => {
    const client = new MongoClient(url)
    let db = null
    client.connect((err) => {
        if(err !== null) {
            console.error('Connect to mongo fail.')
            setTimeout(connectMongo, 5000)
            return
        }
    
        console.log('Connected Successful to server')
        const db = client.db(dbName)
        callback(db)
    })
}



module.exports = {
    connect: connectMongo
}
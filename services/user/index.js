const express = require('express')
const bodyParser = require('body-parser')
const mongo = require('./db/mongo')

const url = process.env.MONGO_URL
const dbName = process.env.DB_NAME


let db = null
mongo.connect(url, dbName, (instance) =>{
    db = instance
})



const app = express()
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('hello world 10')
})

app.post('/', (req,res) => {
    const username = req.body.username
    const password = req.body.password
    const accountCollection = db.collection('account')

    accountCollection.findOne({
        'username': username
    }, (err, document) => {
        if(document){
            return res.json({
                status: false,
                message: 'User Already Exists'
            })
        }

        accountCollection.insertOne({
            username: username,
            password: password
        }, (err, result) => {
            if(err !== null) {
                return res.json({
                    status: false,
                    message: 'Cannot Create user (DB error)'
                })
            }
            return res.json({
                status: result.result.n === 1,
                message: 'user ' + username + ' was created'
            })
        })
        
    })
/*
    */
})

app.listen(process.env.PORT, () => {
    console.log('service user listening at port: '+ process.env.PORT)
})
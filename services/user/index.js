const express = require('express')
const bodyParser = require('body-parser')
const mongo = require('./db/mongo')
const jwt = require('jsonwebtoken')
const jwtVerify = require('express-jwt')
const pw = require('./utils/password')

const url = process.env.MONGO_URL
const dbName = process.env.DB_NAME
const jwtSecret = process.env.JWT_SECRET

const auth = jwtVerify({ secret: jwtSecret })

let db = null
mongo.connect(url, dbName, (instance) =>{
    db = instance
})



const app = express()
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
        db.collection('account').find({}).toArray((err, result) => {
            if(err) {
                return res.json({
                    error: err.message
                })
            }
            return res.json({
                data: result
            })
        })
})





app.post('/auth', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const filter = { username: username}
    


    db.collection('account').findOne(filter, (err, result) => {
        
        if(err){
            return res.json({err})
        }
        if(!result){
            return res.json({ message: 'user not found'})
        }

        if(pw.compare(password, result.password)){
            const token = jwt.sign({
                username: result.username
            }, jwtSecret, { expiresIn: '2h'})
            return res.json({ token: token})
        }

        return res.json({ message: 'Invalid Username'})
    })

})


app.get('/getInfo', auth , (req, res) => {
    return res.json({
        data: req.user
    })
    

    

})






app.get('/u/:id', (req, res) => {
    const id = req.params.id
    db.collection('account').findOne({ _id: mongo.toID}, (err, result) => {
        if(err) {
            return res.json({
                error: err.message
            })
        }
        return res.json({
            data: result
        })
    })
})

app.post('/u/:id', (req, res) => {
    const id = req.params.id
    const password = req.body.password

    const filter = { _id: mongo.toID(id) }
    const update = { '$set': { password: password} }

    db.collection('account').updateOne(filter, update, (err, result) => {
        return res.json({
            data: result.result.ok > 0
        })
    })
})

app.post('/u', (req,res) => {
    
    const username = req.body.username
    const password = pw.hash(req.body.password)
    const accountCollection = db.collection('account')

    console.log('username', username)

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

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('invalid token...');
    }
  });



app.listen(process.env.PORT, () => {
    console.log('service user listening at port: '+ process.env.PORT)
})
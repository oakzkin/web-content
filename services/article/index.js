const express = require('express')
const bodyParser = require('body-parser')
const mongo = require('./db/mongo')
const jwt = require('jsonwebtoken')
const jwtVerify = require('express-jwt')

const url = process.env.MONGO_URL
const dbName = process.env.DB_NAME
const jwtSecret = process.env.JWT_SECRET

const auth = jwtVerify({ secret: jwtSecret })

let db = null
mongo.connect(url, dbName, (instance) =>{
    db = instance
})




//-----------------------------------------init--------------------------------------

const app = express()
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())



app.get('/', (req, res) => {
    const collection = db.collection('article')
    const getArticleTask = collection.find({
        deleteAt: { $exists: false }
    }, {
        projection: {
            content: 0
        }
    }).toArray()
    //promise concept (toArray is promise can use then&catch when callback is finished)
    getArticleTask
    .then((result) => {
        res.send({
            list: result
        })
    })
    .catch((err) => {
        res.send({
            list: [], err: err
        })
    })
})


app.get('/:id', (req, res) => {
    const id = mongo.toID(req.params.id)
    const collection = db.collection('article')
    
    collection.findOne({ 
        _id: id,
        deleteAt: { $exists: false }
    })
    .then((result) => {
        res.status(result ? 200 : 404).send({
            data: result
        })
    })
    .catch((err) => {
        res.status(500).send({
            data: null, err: err
        })
    })
})


app.post('/', auth, (req, res) => {
    const title = req.body.title
    const content = req.body.content
    const username = req.user.username

    const collection = db.collection('article')
    collection.insertOne({
        title: title,
        content: content,
        username: username,
        creatAt: new Date(),
        updateAt: new Date(),
    }).then( result => {
        res.send({ status: true})
    }).catch( err => {
        res.send({ status: false, err: err})
    })

    console.log(req.user)

})


app.post('/:id', auth, (req, res) => {
    const id = mongo.toID(req.params.id)
    const title = req.body.title || false
    const content = req.body.content || false
    const username = req.user.username


    const updates = {}
    if (title !== false) {
        updates.title = title
    }
    if (content !== false){
        updates.content = content
    }

    const collection = db.collection('article')
    collection.updateOne({ _id: id, username}, {$set: updates})
    .then(result => {
        res.send({ status: result.result.ok > 0 })
    })
    .catch(err => {
        res.send({ status: false, err} )
    })
})

app.delete('/:id', auth, (req, res) => {
    const id = mongo.toID(req.params.id)
    const username = req.user.username
    const collection = db.collection('article')

    collection.findOne({ _id: id }).then(result => {
        if (!result) {
            return res.send({ status: false, message: 'article not found' })
        }

        if (result.username !== username) {
            return res.status(401).send({ status: false, message: 'Not authorized' })
        }

        return collection.update( //this is promise
            { _id: id}, 
            { $set: { deleteAt: new Date()}
        })
    })
    .then(result => {//then of return update's promise
        res.send({ status: result.result.ok > 0 })
    })
    
    .catch(err => {
        res.status(500).send({ status: false, err} )
    })
})



app.listen(process.env.PORT, () => {
    console.log('service user listening at port: '+ process.env.PORT)
})
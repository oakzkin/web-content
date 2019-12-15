const express = require('express')
const bodyParser = require('body-parser')
const mongo = require('./db/mongo')


const adminRouter = require('./router/admin').default
const mainRouter = require('./router/main').default


const url = process.env.MONGO_URL
const dbName = process.env.DB_NAME




let db = null
mongo.connect(url, dbName, instance => {
  db = instance

  router(db)
})

function router(db) {
  const app = express()
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  //admin router
  app.use('/', adminRouter(db))

  //main router
  app.use('/', mainRouter(db))

  app.listen(process.env.PORT, () => {
    console.log('service user listening at port: ' + process.env.PORT)
  })
}

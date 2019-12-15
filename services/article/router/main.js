const router = require('express').Router()
const auth = require('../middleware/auth').default



function getRouter(db) {
  router.get('/', (req, res) => {
    const collection = db.collection('article')
    const getArticleTask = collection
      .find(
        {
          deleteAt: { $exists: false }
        },
        {
          projection: {
            content: 0
          }
        }
      )
      .toArray()
    //promise concept (toArray is promise can use then&catch when callback is finished)
    getArticleTask
      .then(result => {
        res.send({
          list: result
        })
      })
      .catch(err => {
        res.send({
          list: [],
          err: err
        })
      })
  })

  /**
   * get article by id
   */
  router.get('/:id', (req, res) => {
    const id = req.params.id
    const collection = db.collection('article')

    collection
      .findOne({
        slug: id,
        deleteAt: { $exists: false }
      })
      .then(result => {
        res.status(result ? 200 : 404).send({
          data: result
        })
      })
      .catch(err => {
        res.status(500).send({
          data: null,
          err: err
        })
      })
  })

  

  

  

  return router
}


module.exports = {
  default: getRouter
}

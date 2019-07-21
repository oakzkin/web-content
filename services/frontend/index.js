const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')


const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', express.static('public'))

//-----------------------------------------------------------

const fs = require('fs') // this engine requires the fs module (fs = file system)
app.engine('html', (filePath, options, callback) => { // define the template engine
  
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    // this is an extremely simple template engine

    let rendered = content.toString()
    for (let key in options.data || {}) {
      rendered = rendered.replace('{{' + key + '}}', options.data[key])
    }


    


    


    return callback(null, rendered)
  })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'html') // register the template engine

const serviceArticle = process.env.ARTICLE_API_PATH


const renderArticleCard = article => {
  return `
  <a href="/${article._id}">
    <div class="card">
      <div class="card-body">
        <h2>${article.title}</h2>
        <div class="card-info">
          Update : <span>${article.updateAt}</span>
        </div>
      </div>
    </div>
  </a>  
  `
}

//-------------------------------------------------

app.get('/', (req, res) => {
  fetch(serviceArticle)
    .then(res => res.json())
    .then(data => {
      const articles = data.list.map(renderArticleCard).join('')

      res.render('index', { 
        data: {
          test: 'test template',
          articles: articles
        }
      })
    })
  
})




app.get('/:id', (req, res) => {
  fetch(`${serviceArticle}/${req.params.id}`)
    .then(res => res.json())
    .then(json => {
      const article = json.data
      res.render('article', {
        data: {
          title: article.title,
          content: article.content,
          author: article.username
        }
      })
    })
  
})



app.listen(process.env.PORT, () => {
    console.log('service frontend start')
})
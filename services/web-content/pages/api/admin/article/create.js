const axios = require('axios').default

export default (req, res) => {
  const { title, content, tags } = req.body
  axios
    .post(`${process.env.ARTICLE_API_PATH}/admin/article`, {
        title,
        content,
        tags
    },{
      headers: req.headers,
    })
    .then(response => {
      if (response.status !== 200) {
        return res.json({
          status: false,
          data: response.data
        })
      }

      return res.json({
        status: true,
        data: response.data
      })
    })
}

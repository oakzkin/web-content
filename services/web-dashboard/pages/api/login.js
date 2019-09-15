const axios = require('axios').default



export default (req, res) => {
  const { username, password } = req.body // const userename = req.body.username || + password

  axios.post(`${process.env.USER_API_PATH}/auth`, {
    username,
    password
  }).then(response => {
    if(!response.data.token){
      return res.status(200).json({
        status: false,
        error: response.data.message
      })
    }
    console.log(response.status, response.data)
    res.status(200).json({
      jwt: response.data.token
    })
  })
}
export default (req, res) => {
  const { username, password } = req.body // const userename = req.body.username || + password
  res.status(200).json({
    username: username,
    password: password
  })
}
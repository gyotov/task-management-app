require('./db/mongoose')
const userRoutes = require('./routes/user/index')

const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use([
  userRoutes.login,
  userRoutes.add,
  userRoutes.delete,
  userRoutes.update,
  userRoutes.get,
])

app.listen(port, () => console.log(`> Server running at port ${port}.`))

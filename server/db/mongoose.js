require('dotenv').config()

const mongoose = require('mongoose')

mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`> Connected to ${process.env.MONGO_DB_URL}`))
  .catch((err) => console.log('> Connection to MongoDB failed.'))

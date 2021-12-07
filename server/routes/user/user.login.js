const express = require('express')
const router = new express.Router()

router.post('/users/login', async (req, res) => {
  res.status(200).send({
    sucess: true
  })
})

module.exports = router

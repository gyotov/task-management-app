const express = require('express')
const router = new express.Router()

router.patch('/users/update/:id', async (req, res) => {
  res.status(200).send('Update: ' + req.params.id)
})

module.exports = router

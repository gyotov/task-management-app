const paths = require('../../config').paths
const User = require(paths.models.user)
const express = require('express')
const router = new express.Router()

const { generateUserData } = require(paths.helpers)

router.get('/users', async (req, res) => {
  const users = await User.find()

  res.status(200).send(users)
})

router.get('/users/:id', async (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(404).send({
      errors: [
        {
          message: 'User id is not valid'
        }
      ]
    })

    return
  }

  const user = await User.findOne({ _id: req.params.id })

  if (!user) {
    res.status(404).send({
      errors: [
        {
          message: 'User not found'
        }
      ]
    })

    return
  }

  res.status(200).send(generateUserData(user))
})

module.exports = router

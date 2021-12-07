require('dotenv').config({ path: __dirname })
const paths = require('../../config').paths
const {
  generateUserData,
  generateUserRequest
} = require(paths.helpers)

const User = require(paths.models.user)

const express = require('express')
const router = new express.Router()

router.post('/users/add', async (req, res) => {
  const userExist = await User.findOne({ email: req.body.email })

  if (userExist) {
    res.status(403).send({
      errors: [
        {
          message: 'User already exist with email address provided.'
        }
      ]
    })

    return
  }

  const user = new User(await generateUserRequest(req.body))

  user
    .save()
    .then((user) => {
      res.status(200).send(generateUserData(user))
    })
    .catch((errors) => {
      const errorsObj = errors.errors
        ? Object.entries(errors.errors).reduce((obj, error) => {
            return {
              ...obj,
              [error[1].path]: error[1].message
            }
          }, {})
        : errors

      res.status(400).send(errorsObj)
    })
})

module.exports = router

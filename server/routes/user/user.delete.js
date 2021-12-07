const paths = require('../../config').paths
const User = require(paths.models.user)
const express = require('express')
const router = new express.Router()

router.delete('/users/delete/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      throw new Error()

      return
    }

    await User.deleteOne({ _id: req.params.id })

    res.status(200).send(user)
  } catch (error) {
    res.status(400).send({
      errors: [
        {
          message: 'User with id not found, or id is invalid'
        }
      ]
    })
  }
})

module.exports = router

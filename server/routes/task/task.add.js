require('dotenv').config({ path: __dirname })
const paths = require('../../config').paths
const Task = require(paths.models.task)
const User = require(paths.models.user)

const express = require('express')
const router = new express.Router()

router.post('/tasks/add', async (req, res) => {
  const user = await User.findById(req.body.user)
  const manager = await User.findById(req.body.manager)

  if (!(user && manager)) {
    res.status(400).send({
      message: 'Task user and manager are required'
    })

    return
  }

  const task = new Task({
    title: req.body.title,
    user: req.body.user,
    manager: req.body.manager,
    due_date: new Date(req.body.due_date),
    instructions: req.body.instructions,
    client_notes: req.body.client_notes,
    access_depot: req.body.access_depot,
    code_url: req.body.code_url,
    checklists: req.body.checklists,
    comments: req.body.comments
  })

  task
    .save()
    .then(() => {
      res.status(200).send(task)
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

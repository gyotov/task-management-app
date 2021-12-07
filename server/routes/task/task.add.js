require('dotenv').config({ path: __dirname })
const paths = require('../../config').paths
const Task = require(paths.models.task)

const express = require('express')
const router = new express.Router()

router.post('/tasks/add', async (req, res) => {
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

  try {
    task.save((errors, task) => {
      Task
        .populate(task, { path: 'user manager comments.user' })
        .then(response => {
          res.status(200).send(response)
        })
        .catch(error => {
          res.status(500).send(error)
        })
    })
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router

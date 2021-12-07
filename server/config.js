const path = require('path')
const paths = {
  helpers: path.resolve('utils/', 'helpers'),
  models: {
    user: path.resolve('server/', 'models/', 'User'),
    task: path.resolve('server/', 'models/', 'Task')
  }
}

module.exports = {
  paths
}

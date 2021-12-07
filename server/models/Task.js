const mongoose = require('mongoose')
const Schema = mongoose.Schema
const options = {
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}
const attributes = {
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  client_meta: {
    type: String,
    default: 'No related client'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User id is required']
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Manager id is required']
  },
  due_date: {
    type: Date,
    required: [true, 'Due date is required']
  },
  instructions: {
    type: String,
    default: ''
  },
  client_notes: [
    {
      title: {
        type: String,
        required: [true, 'Note title is required']
      },
      content: {
        type: String,
        required: [true, 'Note content is required']
      },
      date: {
        type: Date,
        required: [true, 'Note date is required']
      },
      user: {
        type: String,
        required: [true, 'Note user is required']
      },
      _id: false
    }
  ],
  access_depot: [
    {
      title: {
        type: String
      },
      main_instance: {
        type: Boolean,
        default: false
      },
      connection_type: {
        type: String,
        enum: [
          'ftp',
          'sftp',
          'other'
        ]
      },
      host: String,
      username: String,
      password: String,
      notes: String,
      _id: false
    }
  ],
  code_url: {
    type: String,
    default: null
  },
  checklists: [
    {
      title: String,
      parts: [
        {
          title: String,
          items: [
            {
              label: {
                type: String,
                required: [true, 'Checkbox label is required']
              },
              eta: {
                type: Number,
                required: [true, 'ETA label is required']
              },
            _id: false
            }
          ],
          _id: false
        }
      ],
      _id: false
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User id is required']
      },
      date: Date,
      content: String,
      _id: false
    }
  ]
}
const schema = new mongoose.Schema(attributes, options)

const Task = mongoose.model('Task', schema)

module.exports = Task

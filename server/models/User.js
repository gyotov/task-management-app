const mongoose = require('mongoose')
const options = {
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}
const attributes = {
  username: {
    type: String,
    required: [true, 'Username not provided or invalid'],
    unique: true
  },
  first_name: {
    type: String,
    required: [true, 'First name not provided or invalid'],
    unique: true
  },
  last_name: {
    type: String,
    required: [true, 'Last name not provided or invalid'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password not provided or invalid'],
    unique: false
  },
  avatar: String,
  role: {
    type: String,
    required: [true, 'User role not provided or invalid'],
    unique: false,
    validate: [
      value => ['developer', 'manager'].includes(value)
    ]
  },
  email: {
    type: String,
    required: [true, 'Email not provided or invalid'],
    unique: true,
    validate: [
      value => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
    ]
  },
  phone: {
    type: String,
    required: [true, 'Phone not provided or invalid'],
    unique: true,
    validate: [
      value => /^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/.test(value)
    ]
  },
  phone_visibility: {
    type: Boolean,
    default: false
  },
  birth_day: {
    type: Date,
    required: [true, 'Birth date not provided or invalid'],
    unique: false
  },
  gdpr: {
    type: Boolean,
    default: false
  },
  ssh_keys: {
    type: Array,
    default: [],
    _id: false
  },
  wageslips: {
    type: Array,
    default: [],
    _id: false
  },
  tasks: {
    type: Array,
    default: [],
    _id: false
  },
  targets: [
    {
      date: {
        month: {
          type: String,
          required: [true, 'Target - Month: Not provided or invalid']
        },
        year: {
          type: String,
          required: [true, 'Target - Year: Not provided or invalid']
        }
      },
      points: {
        type: Number,
        required: [true, 'Target - Points: Not provided or invalid']
      },
      target: {
        type: Number,
        required: [true, 'Target: Not provided or invalid']
      },
      _id: false
    }
  ]
}
const schema = new mongoose.Schema(attributes, options)

const User = mongoose.model('User', schema)

module.exports = User

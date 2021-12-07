require('dotenv').config({ path: __dirname })
const bcrypt = require('bcrypt')

/**
 * Clones an Object without any references
 * @param  {Obj} obj
 * @return {Obj}
 */
const deepClone = obj => JSON.parse(JSON.stringify(obj))

/**
 * Generate user name based on first name first letter and last name,
 * all downcased
 * @param  {String} firstName
 * @param  {String} lastName
 * @return {String}
 */
const generateUsername = (firstName, lastName) => {
  if (!firstName || !lastName) {
    return ''
  }

  return (
    firstName.charAt(0).toLowerCase() +
    lastName.toLowerCase()
  )
}

/**
 * Hash password via bcrypt
 * @param  {String} password
 * @return {String}
 */
const passwordHash = (password) => {
  if (!password) {
    return false
  }

  const passwordString = password.concat(process.env.BCRYPT_SECRET || '')

  return bcrypt.hash(
    passwordString, parseInt(process.env.BCRYPT_SALT)
  )
}

/**
 * Generate user data from Model response
 * @param  {Obj} user
 * @return {Obj}
 */
const generateUserData = (user) => {
  const userObject = deepClone(user)

  userObject.id = userObject._id
  delete userObject.password
  delete userObject._id

  return userObject
}

/**
 * Generate user Model data to send to database
 * @param  {Obj} request The request body object
 * @return {Obj}
 */
const generateUserRequest = async (request) => {
  const hashedPassword = await passwordHash(request.password)
  const obj = {
    username: generateUsername(request.first_name, request.last_name),
    first_name: request.first_name,
    last_name: request.last_name,
    password: hashedPassword,
    avatar: request.avatar,
    role: request.role,
    email: request.email,
    phone: request.phone,
    phone_visibility: request.phone_visibility,
    birth_day: request.birth_day ? new Date(request.birth_day) : null,
    gdpr: request.gdpr,
    ssh_keys: request.ssh_keys,
    wageslips: request.wageslips,
    tasks: request.tasks,
    targets: [
      {
        date: {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear()
        },
        points: 0,
        target: process.env.DEFAULT_TARGET
      }
    ]
  }

  return obj
}

module.exports = {
  deepClone,
  generateUsername,
  passwordHash,
  generateUserData,
  generateUserRequest
}

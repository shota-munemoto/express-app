'use strict'

const bcrypt = require('bcrypt')
const unique = require('./unique')

const saltRounds = 10
const hashPassword = async user =>
  (user.passwordDigest = await bcrypt.hash(user.password, saltRounds))

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: 'User name cannot be empty' },
          unique: unique('User', 'name')
        }
      },
      password: {
        type: DataTypes.VIRTUAL,
        validate: {
          isLength: {
            min: 8,
            max: undefined,
            msg: 'User password must be more than 8 characters'
          },
          isByteLength: {
            min: undefined,
            max: 72,
            msg: 'User password is too long'
          }
        }
      },
      passwordDigest: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(_) {
          // associations can be defined here
        }
      },
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword
      }
    }
  )
  return User
}

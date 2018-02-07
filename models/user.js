'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      passwordDigest: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(_) {
          // associations can be defined here
        }
      }
    }
  )
  return User
}

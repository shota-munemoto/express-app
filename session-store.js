const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const models = require('./models')

const store = new SequelizeStore({
  db: models.sequelize
})
store.sync()

module.exports = store

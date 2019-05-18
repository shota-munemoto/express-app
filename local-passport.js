const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const models = require('./models')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'name',
      passwordField: 'password'
    },
    async (name, password, done) => {
      try {
        const user = await models.User.findOne({ where: { name } })
        if (!user) {
          return done(null, false, { message: 'Invalid name or password' })
        }
        const valid = await bcrypt.compare(password, user.passwordDigest)
        if (!valid) {
          return done(null, false, { message: 'Invalid name or password' })
        }
        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  models.User.findOne({ where: { id } })
    .then(user => {
      done(null, user)
    })
    .catch(error => {
      done(error)
    })
})

module.exports = passport

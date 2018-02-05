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
    (name, password, done) => {
      let user
      models.User.findOne({ where: { name } })
        .then(foundUser => {
          if (!foundUser) {
            return done(null, false)
          }
          user = foundUser
          return bcrypt.compare(password, user.passwordDigest)
        })
        .then(valid => {
          if (!valid) {
            return done(null, false)
          }
          return done(null, user)
        })
        .catch(error => {
          return done(error)
        })
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  models.User.findById(id)
    .then(user => {
      done(null, user)
    })
    .catch(error => {
      done(error)
    })
})

module.exports = passport

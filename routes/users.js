const express = require('express')
const bcrypt = require('bcrypt')
const models = require('../models')

const router = express.Router()
const saltRounds = 10

router.get('/new', (req, res) => {
  res.render('users/new', { csrfToken: req.csrfToken() })
})

router.post('/', async (req, res, next) => {
  const name = req.body.name
  const password = req.body.password
  try {
    const passwordDigest = await bcrypt.hash(password, saltRounds)
    const user = await models.User.create({ name, passwordDigest })
    req.login(user, error => {
      if (error) {
        return next(error)
      }
      return res.redirect('/')
    })
  } catch (error) {
    return next(error)
  }
})

module.exports = router

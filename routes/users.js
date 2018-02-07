const express = require('express')
const models = require('../models')

const router = express.Router()

router.get('/new', (req, res) => {
  res.render('users/new', { csrfToken: req.csrfToken() })
})

router.post('/', async (req, res, next) => {
  const name = req.body.name
  const password = req.body.password
  const user = await models.User.create({ name, password }).catch(error => {
    req.flash('error', error.errors.map(error => error.message))
    res.render('users/new', { csrfToken: req.csrfToken() })
    return null
  })
  if (!user) return
  req.login(user, error => {
    if (error) {
      return next(error)
    }
    return res.redirect('/')
  })
})

module.exports = router
